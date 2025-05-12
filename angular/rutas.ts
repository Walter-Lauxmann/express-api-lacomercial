// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { ProductListComponent } from './product-list.component';
import { ProductFormComponent } from './product-form.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductListComponent },
  { path: 'productos/nuevo', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'productos/editar/:id', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/productos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// app.module.ts (fragmento)
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { ProductListComponent } from './product-list.component';
import { ProductFormComponent } from './product-form.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}

// app.component.html
<nav>
  <a routerLink="/productos">Productos</a>
  <a routerLink="/productos/nuevo" *ngIf="auth.hasRole(['admin', 'editor'])">Nuevo Producto</a>
  <a routerLink="/login" *ngIf="!auth.isAuthenticated()">Login</a>
  <button (click)="logout()" *ngIf="auth.isAuthenticated()">Salir</button>
</nav>
<router-outlet></router-outlet>

// app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
