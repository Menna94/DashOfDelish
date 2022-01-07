import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Recipe } from "../models/recipe";

@Injectable()
export class RecipeService{
    private recipes: Recipe[] = [];
    private recipesUpdated = new Subject<Recipe[]>();

    constructor(private _http:HttpClient, private _router:Router){}

    getRecipesUpdatedListener(){
        return this.recipesUpdated.asObservable();
    }

    getRecipeById(idx:string){
        //copy the object -> minimizes the manipulation by accident
        // return { ...this.recipes.find(recipe => recipe.id === idx)}
        return this._http.get<{data:any}>(`http://localhost:3000/api/recipes/${idx}`)
    }

    getRecipes(){
        this._http
        .get<{message:string, data:any}>('http://localhost:3000/api/recipes')
        .pipe(
            map(resData=>{
                console.log(resData);
                
                return resData.data.map(recipe=>{
                    return{
                        id: recipe._id,
                        recipeName: recipe.recipeName,
                        recipeImg:recipe.recipeImg,
                        servings:recipe.servings ,
                        prepTime: recipe.prepTime,
                        cookingTime: recipe.cookingTime,
                        totalTiming: recipe.totalTiming,              
                        briefIntro: recipe.briefIntro,
                        history: recipe.history,
                        nutritionInfo: recipe.nutritionInfo
                        // ingredients: recipe.ingredients,
                        // steps: recipe.steps
                    }
                })
            })
        )
        .subscribe( resData =>{
            this.recipes = resData;
            this.recipesUpdated.next([...this.recipes])
        });
    }

    addRecipe(recipe, img:File){
        const recipeData = new FormData();
        recipeData.append('recipeName', recipe.recipeName);
        recipeData.append('recipeImg', recipe.recipeImg, recipe.recipeName);
        recipeData.append('cookingTime', recipe.cookingTime);
        recipeData.append('prepTime', recipe.prepTime);
        recipeData.append('totalTiming', recipe.totalTiming);
        recipeData.append('servings', recipe.servings);
        recipeData.append('briefIntro', recipe.briefIntro);
        recipeData.append('history', recipe.history);
        recipeData.append('nutritionInfo', recipe.nutritionInfo);
        // recipeData.append('ingredients', JSON.stringify(recipe.ingredients))
        const ingredients = recipe.ingredients;
        ingredients.forEach(i=>{
            recipeData.append('ingredients[]', JSON.stringify(i))
        })
        

        // console.log(recipeData);
        
        


        this._http.post<{recipeId:string, data:Recipe}>('http://localhost:3000/api/recipes', recipeData)
        .subscribe(resData=>{
            console.log(resData);
            
            const newRecipe:Recipe = {
                id: resData.data.id,
                cookingTime: resData.data.cookingTime,
                recipeName: resData.data.recipeName,
                recipeImg: resData.data.recipeImg,
                servings: resData.data.servings,
                totalTiming: resData.data.totalTiming,
                prepTime: resData.data.recipeName,
                briefIntro: resData.data.briefIntro,
                history: resData.data.history,
                nutritionInfo: resData.data.nutritionInfo,
                ingredients:resData.data.ingredients
                
            };

            this.recipes.push(newRecipe);
            this.recipesUpdated.next([...this.recipes]);            
            this._router.navigate(["/"]);
        })
        
    }

    deleteRecipe(idx:string){
        this._http.delete(`http://localhost:3000/api/recipes/${idx}`)
        .subscribe(
            ()=>{
                const filteredRecipes = this.recipes.filter(recipe=> recipe.id !==idx);

                this.recipes = filteredRecipes;
                this.recipesUpdated.next([...this.recipes]);
            }
        )
    }

    updateRecipe(idx:string, recipe){
        this._http.put(`http://localhost:3000/api/recipes/${idx}`, recipe).subscribe(
            res=>{
                console.log('from updateRecipe in the service');
                
                console.log(res);
                
            }
        )
    }
}