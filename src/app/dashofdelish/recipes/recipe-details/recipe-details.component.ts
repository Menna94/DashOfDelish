import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe:Recipe;
  recipeId;
  date;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(
      (paramMap:ParamMap)=>{
        if(paramMap.has('id')){
          this.recipeId = paramMap.get('id');
        }
        
        
      }
    )

    this._recipeService.getRecipeById(this.recipeId)
    .subscribe(
      res=>{
        this.recipe = res.data;
        console.log(this.recipe);
        
      }
    )


  }

  navigate(){
    this._router.navigate(['./'])
  }

}
