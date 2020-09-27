import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { CheckAgeComponent } from './pages/check-age/check-age.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminComponent } from './admin/admin.component';
import { CheckAgeGuard } from './shared/guards/check-age.guard';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminRecipesComponent } from './admin/admin-recipes/admin-recipes.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { BrandProductsComponent } from './pages/brand-products/brand-products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthAdminGuard } from './shared/guards/auth-admin.guard';
import { AuthUserGuard } from './shared/guards/auth-user.guard';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminInquiriesComponent } from './admin/admin-inquiries/admin-inquiries.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'check-age', component: CheckAgeComponent },
  { path: 'home', component: HomeComponent, canActivate: [CheckAgeGuard] },
  { path: 'login', component: LoginComponent, canActivate: [CheckAgeGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthUserGuard] },
  { path: 'brands', component: BrandsComponent, canActivate: [CheckAgeGuard] },
  { path: 'brands/:category', component: BrandProductsComponent, canActivate: [CheckAgeGuard] },
  { path: 'brands/:category/:name', component: ProductDetailsComponent, canActivate: [CheckAgeGuard] }, 
  { path: 'basket', component: BasketComponent, canActivate: [CheckAgeGuard] },
  { path: 'recipes', component: RecipesComponent, canActivate: [CheckAgeGuard] },
  { path: 'recipes/:name', component: RecipeDetailsComponent, canActivate: [CheckAgeGuard] },
  { path: 'news', component: NewsComponent, canActivate: [CheckAgeGuard] },
  { path: 'news/:name', component: NewsDetailsComponent, canActivate: [CheckAgeGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [CheckAgeGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard], children: [
    { path: '', redirectTo: 'category', pathMatch: 'full' },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'orders', component: AdminOrdersComponent },
    { path: 'news', component: AdminNewsComponent },
    { path: 'recipes', component: AdminRecipesComponent },
    { path: 'inquiries', component: AdminInquiriesComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
