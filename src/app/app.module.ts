import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgxParallaxScrollModule } from 'ngx-parallax-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CheckAgeComponent } from './pages/check-age/check-age.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminRecipesComponent } from './admin/admin-recipes/admin-recipes.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { BrandProductsComponent } from './pages/brand-products/brand-products.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { OrderByPipe } from './shared/pipes/order-by.pipe';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BasketComponent } from './pages/basket/basket.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AdminInquiriesComponent } from './admin/admin-inquiries/admin-inquiries.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactsComponent,
    CheckAgeComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminNewsComponent,
    AdminRecipesComponent,
    AdminOrdersComponent,
    ProductDetailsComponent,
    BrandsComponent,
    BrandProductsComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    NewsComponent,
    NewsDetailsComponent,
    OrderByPipe,
    LoginComponent,
    ProfileComponent,
    BasketComponent,
    SearchPipe,
    AdminInquiriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxParallaxScrollModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ModalModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
