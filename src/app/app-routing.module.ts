import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// 
import { AuthComponent } from './dashofdelish/auth/auth.component';
import { AuthGuard } from './dashofdelish/auth/auth.guard';
import { HomeComponent } from './dashofdelish/home/home.component';
import { RecipeListComponent } from './dashofdelish/recipes/recipe-list/recipe-list.component';
import { ProfileComponent } from './dashofdelish/user/profile/profile.component';
import { RecipeCreateComponent } from './dashofdelish/recipes/recipe-create/recipe-create.component';
import { UserComponent } from './dashofdelish/user/user.component';
import { RecipesComponent } from './dashofdelish/recipes/recipes.component';

const routes: Routes = [
  //http://localhost:4200
  {path:'', component: HomeComponent, pathMatch:'full'},
  //http://localhost:4200/auth
  {path:'auth', component: AuthComponent},
  //http://localhost:4200/recipes
  {path:'recipes', component:RecipesComponent,
    children:[
      //http://localhost:4200/recipes/recipe-create
      {path:'recipe-create', component:RecipeCreateComponent, canActivate:[AuthGuard]},
      //http://localhost:4200/recipes/recipe-update
      {path:'recipe-update/:id', component:RecipeCreateComponent, canActivate:[AuthGuard]},
        //http://localhost:4200/recipes/recipe-list  --> Visitor View
      {path:'reicpe-list', component:RecipeListComponent},
    ]
  },
  {//http://localhost:4200/user
    path:'user', component:UserComponent,
    children:[
      {//http://localhost:4200/user/:id
        path:':id', component:ProfileComponent, 
        children:[
        //http://localhost:4200/user/:id/recipe-list  --> User View
        {path:'recipe-list', component: RecipeListComponent, canActivate:[AuthGuard]}
      ]
    }
      
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { 

}
