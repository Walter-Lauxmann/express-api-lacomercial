// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(usuario: string, clave: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { usuario, clave })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.rol;
  }

  hasRole(roles: string[]): boolean {
    const userRole = this.getRole();
    return userRole ? roles.includes(userRole) : false;
  }
}

// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { usuario, clave } = this.loginForm.value;
      this.authService.login(usuario, clave).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: err => this.errorMsg = 'Usuario o clave incorrectos'
      });
    }
  }
}

// login.component.html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <label for="usuario">Usuario:</label>
  <input id="usuario" formControlName="usuario">

  <label for="clave">Clave:</label>
  <input id="clave" type="password" formControlName="clave">

  <button type="submit">Ingresar</button>

  <div *ngIf="errorMsg" style="color: red">{{ errorMsg }}</div>
</form>

// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/productos')
      .subscribe(data => this.productos = data);
  }
}

// product-list.component.html
<div *ngFor="let prod of productos">
  <p>{{ prod.nombre }} - {{ prod.precio }}</p>
</div>

// product-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  form: FormGroup;
  canEdit: boolean;
  canDelete: boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: [null]
    });

    this.canEdit = auth.hasRole(['admin', 'editor']);
    this.canDelete = auth.hasRole(['admin']);
  }

  onFileChange(event: any): void {
    this.form.patchValue({ imagen: event.target.files[0] });
  }

  onSubmit(): void {
    if (!this.canEdit || this.form.invalid) return;
    const formData = new FormData();
    formData.append('nombre', this.form.value.nombre);
    formData.append('precio', this.form.value.precio);
    if (this.form.value.imagen) {
      formData.append('imagen', this.form.value.imagen);
    }
    const headers = new HttpHeaders({ Authorization: this.auth.getToken() || '' });
    this.http.post('http://localhost:3000/api/productos', formData, { headers }).subscribe();
  }

  deleteProduct(id: number): void {
    if (!this.canDelete) return;
    const headers = new HttpHeaders({ Authorization: this.auth.getToken() || '' });
    this.http.delete(`http://localhost:3000/api/productos/${id}`, { headers }).subscribe();
  }
}

// product-form.component.html
<form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="canEdit">
  <input type="text" formControlName="nombre" placeholder="Nombre">
  <input type="number" formControlName="precio" placeholder="Precio">
  <input type="file" (change)="onFileChange($event)">
  <button type="submit">Guardar</button>
</form>
