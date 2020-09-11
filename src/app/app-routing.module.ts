import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { CheckAgeComponent } from './pages/check-age/check-age.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'check-age', component: CheckAgeComponent },
  { path: 'home', component: HomeComponent, canActivate: [CheckAgeGuard] },
  { path: 'brands', component: BrandsComponent },
  { path: 'brands/:category', component: BrandProductsComponent },
  { path: 'brands/:category/:name', component: ProductDetailsComponent }, 
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:name', component: RecipeDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'admin', component: AdminComponent, children: [
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
