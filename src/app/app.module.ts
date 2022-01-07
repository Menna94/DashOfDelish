import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './dashofdelish/auth/auth.component';
import { HeaderComponent } from './dashofdelish/shared/header/header.component';
import { HomeComponent } from './dashofdelish/home/home.component';
import { AuthService } from './dashofdelish/services/auth.service';
import { AuthInterceptor } from './dashofdelish/auth/auth-interceptor';
import { UserComponent } from './dashofdelish/user/user.component';
import { RecipeCreateComponent } from './dashofdelish/recipes/recipe-create/recipe-create.component';
import { ShoppingListComponent } from './dashofdelish/user/shopping-list/shopping-list.component';
import { FooterComponent } from './dashofdelish/shared/footer/footer.component';
import { RecipeListComponent } from './dashofdelish/recipes/recipe-list/recipe-list.component';
import { ProfileComponent } from './dashofdelish/user/profile/profile.component';
import { RecipeService } from './dashofdelish/services/recipe.service';
import { RecipesComponent } from './dashofdelish/recipes/recipes.component';
//
import {Ng2PageScrollModule} from 'ng2-page-scroll';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    RecipeCreateComponent,
    ShoppingListComponent,
    FooterComponent,
    RecipeListComponent,
    ProfileComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2PageScrollModule
  ],
  providers: [
    RecipeService,
    AuthService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
