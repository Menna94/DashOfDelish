import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl,  Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { mimeType } from '../../shared/mime-type.validator';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  recipeForm : FormGroup;
  ingredients: FormArray;
  directions: FormArray;
  editMode : boolean = false;
  recipeId : string;
  recipe:Recipe;
  imgPreview:string;
  date:any;
  


  constructor(
    private _route:ActivatedRoute,
    private _recipeService:RecipeService,
    private _fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(
      (paramMap:ParamMap)=>{
        if(paramMap.has('id')){
          this.editMode = true; 
          this.recipeId = paramMap.get('id');
        }else{
          this.editMode = false;
          this.recipeId = null;
        }
      }
    )
    this.initForm();
    
  }
  createIngredient(ingredient?:any):FormGroup{
      return this._fb.group({
        name :ingredient.name,
        amount: ingredient.amount  
      })
  }

  createDirection(step?:any):FormGroup{
    return this._fb.group({
      step:step.step,
      stepTitle: step.stepTitle,
      stepDetails: step.stepDetails  
    })
  }
  private initForm(){
    // In Edit Mode:-
    if(this.editMode){
      this._recipeService.getRecipeById(this.recipeId)
      .subscribe(
        recipeData=>{          
          this.recipeForm.patchValue(recipeData.data)      
          this.date = recipeData.data.createdAt;

          const recipeIngreds = recipeData.data.ingredients;
          if(recipeIngreds){
            for(let ingredient of recipeIngreds){
              console.log(ingredient);
              this.ingredients = this.recipeForm.get('ingredients') as FormArray;
              this.ingredients.push(this.createIngredient(ingredient))
              
            }
          }

          const recipeDirections = recipeData.data.directions;
          if(recipeDirections){
            for(let step of recipeDirections){
              this.directions = this.recipeForm.get('directions') as FormArray;
              this.directions.push(this.createDirection(step))
            }
          }

        }
        
      )
    }
    this.recipeForm = this._fb.group({
      recipeName: [],
      createdAt: [],
      servings: [],
      prepTime: [],
      cookingTime: [],
      totalTiming: [],
      briefIntro: [],
      history: [],
      nutritionInfo:[],
      ingredients: this._fb.array([ this.createIngredient('') ]),
      directions: this._fb.array([ this.createDirection('') ])
    })
    
  }

  onSubmit(){
    // if(this.recipeForm.invalid){
    //   console.log('form invalid');
    // }
    // else{
      if(this.editMode){
        console.log('from if(this.editMode){');
        
        this._recipeService.updateRecipe(this.recipeId,this.recipeForm.value)
      }
      else{
        console.log(this.recipeForm.value);
        
        this._recipeService.addRecipe(this.recipeForm.value)
      }

      // this.recipeForm.reset();

    // }
    
  }
  onAddIngredient(){
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createIngredient(''));
  }

  onAddStep(){
    this.directions = this.recipeForm.get('directions') as FormArray;
    this.directions.push(this.createDirection('')); 
  }

  onDeleteIngredient(idx:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(idx)
  }

  onImagePicked(event:Event){
    //type conversion
    const file = (event.target as HTMLInputElement).files[0];
    this.recipeForm.patchValue({recipeImg:file});
    this.recipeForm.get('recipeImg').updateValueAndValidity();
    
    //preview image
    const reader = new FileReader();
    reader.onload = ()=>{//asynchronous
      this.imgPreview = reader.result as string
    }
    reader.readAsDataURL(file);
  }
  

  //getters
  get ingredControl(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  get directControl(){
    return (<FormArray>this.recipeForm.get('directions')).controls;
  }
}


