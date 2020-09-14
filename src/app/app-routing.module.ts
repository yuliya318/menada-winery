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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'check-age', component: CheckAgeComponent },
  { path: 'home', component: HomeComponent, canActivate: [CheckAgeGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthUserGuard] },
  { path: 'brands', component: BrandsComponent },
  { path: 'brands/:category', component: BrandProductsComponent },
  { path: 'brands/:category/:name', component: ProductDetailsComponent }, 
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:name', component: RecipeDetailsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:name', component: NewsDetailsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard], children: [
    { path: '', redirectTo: 'category', pathMatch: 'full' },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'orders', component: AdminOrdersComponent },
    { path: 'news', component: AdminNewsComponent },
    { path: 'recipes', component: AdminRecipesComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
