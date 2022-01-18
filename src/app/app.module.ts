import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './dashofdelish/auth/auth.component';
import { AuthInterceptor } from './dashofdelish/auth/auth-interceptor';
//
import { AuthService } from './dashofdelish/services/auth.service';
import { RecipeService } from './dashofdelish/services/recipe.service';
//
import {Ng2PageScrollModule} from 'ng2-page-scroll';

//
import { RecipeListComponent } from './dashofdelish/recipes/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './dashofdelish/recipes/recipe-create/recipe-create.component';
import { RecipeDetailsComponent } from './dashofdelish/recipes/recipe-details/recipe-details.component';
import { RecipesComponent } from './dashofdelish/recipes/recipes.component';
//
import { UserComponent } from './dashofdelish/user/user.component';
import { ProfileComponent } from './dashofdelish/user/profile/profile.component';
import { ShoppingListComponent } from './dashofdelish/user/shopping-list/shopping-list.component';
//
import { HeaderComponent } from './dashofdelish/shared/header/header.component';
import { HomeHeaderComponent } from './dashofdelish/shared/home-header/home-header.component';
import { FooterComponent } from './dashofdelish/shared/footer/footer.component';
import { NotFoundComponent } from './dashofdelish/not-found/not-found.component';
import { HomeComponent } from './dashofdelish/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NotFoundComponent,
    RecipeListComponent,
    RecipeCreateComponent,
    RecipeDetailsComponent,
    RecipesComponent,
    ProfileComponent,
    ShoppingListComponent,
    UserComponent,
    HeaderComponent,
    HomeHeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2PageScrollModule,
    // SharedModule
  ],
  providers: [
    RecipeService,
    AuthService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
