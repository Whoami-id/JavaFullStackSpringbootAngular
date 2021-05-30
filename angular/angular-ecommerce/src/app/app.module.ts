import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './compenents/product-list/product-list.component';
import { ProductService } from './services/product.service';
import {Routes, RouterModule, Router} from '@angular/router';
import { ProductCategoryMenuComponent } from './compenents/product-category-menu/product-category-menu.component';
import { SearchComponent } from './compenents/search/search.component';
import { ProductDetailsComponent } from './compenents/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './compenents/cart-status/cart-status.component';
import { CartDetailsComponent } from './compenents/cart-details/cart-details.component';
import { CheckoutComponent } from './compenents/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './compenents/login/login.component';
import { LoginStatusComponent } from './compenents/login-status/login-status.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';


import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './compenents/members-page/members-page.component';
import { OrderHistoryComponent } from './compenents/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);





const routes: Routes = [
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard]},
  {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard]},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: oktaConfig },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
bootstrap: [AppComponent]
})
export class AppModule { }
