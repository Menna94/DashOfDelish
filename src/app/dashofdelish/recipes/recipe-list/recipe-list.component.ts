import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../models/recipe';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  userIsAuth:boolean = false;

  // private authStatusSubs:Subscription;
  private recipesSub: Subscription;

  constructor(
    private _recipeService: RecipeService,
    private _route: ActivatedRoute,
    private _auth:AuthService,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this._recipeService.getRecipes();

    this.recipesSub = this._recipeService
    .getRecipesUpdatedListener()
      .subscribe(
        (recipes:Recipe[])=>{
          this.recipes = recipes
          console.log(this.recipes);
          
        } 
      );
    this.userIsAuth = this._auth.getIsAuth();
    
  }

  onDelete(idx:any){
    this._recipeService.deleteRecipe(idx);
  }

  ngOnDestroy(){
    this.recipesSub.unsubscribe();
    // this.authStatusSubs.unsubscribe();
  }

}
