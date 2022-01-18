import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// 
import { AuthComponent } from './dashofdelish/auth/auth.component';
import { AuthGuard } from './dashofdelish/auth/auth.guard';
import { HomeComponent } from './dashofdelish/home/home.component';
import { NotFoundComponent } from './dashofdelish/not-found/not-found.component';
import { RecipeCreateComponent } from './dashofdelish/recipes/recipe-create/recipe-create.component';
import { RecipeDetailsComponent } from './dashofdelish/recipes/recipe-details/recipe-details.component';
import { RecipeListComponent } from './dashofdelish/recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './dashofdelish/recipes/recipes.component';
import { ProfileComponent } from './dashofdelish/user/profile/profile.component';
import { ShoppingListComponent } from './dashofdelish/user/shopping-list/shopping-list.component';
import { UserComponent } from './dashofdelish/user/user.component';

const routes: Routes = [
  {//http://localhost:4200
    path:'' , component: HomeComponent, pathMatch:'full'
  },
  {//http://localhost:4200/auth
    path:'auth', component: AuthComponent
  },
  {//http://localhost:4200/recipes
    path:'recipes', component: RecipesComponent, children:[
      {//http://localhost:4200/recipes/recipe-create
        path:'', component: RecipeListComponent
      },
      {//http://localhost:4200/recipes/recipe-create
        path:'recipe-create', component: RecipeCreateComponent, canActivate:[AuthGuard]
      },
      {//http://localhost:4200/recipes/recipe-edit
        path:'recipe-edit', component: RecipeCreateComponent, canActivate:[AuthGuard]
      },
      {//http://localhost:4200/recipes/:id
        path:':id', component: RecipeDetailsComponent
      }
    ]
  },
  {//http://localhost:4200/user
    path:'user', component:UserComponent, children:[
      {//http://localhost:4200/user/shopping-list
        path:'shopping-list' , component: ShoppingListComponent
      },
      {//http://localhost:4200/user/:id
        path:'profile' , component: ProfileComponent
      }
    ]
  },
  {
    path:'**', component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { 

}
