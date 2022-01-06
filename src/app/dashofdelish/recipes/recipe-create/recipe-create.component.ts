import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl,  Validators, NgForm } from '@angular/forms';
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
  recipeForm : FormGroup
  editMode : boolean = false;
  recipeId : string;
  recipe:Recipe;
  imgPreview:string;


  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _recipeService:RecipeService
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


  private initForm(){
    //initializing form varibles
    let id = null;
    let recipeName = '';
    let recipeImg = '';
    let servings = null;
    let prepTime = '';
    let cookingTime = '';
    let totalTiming = '';
    let nutritionInfo='';
    let briefIntro = '';
    let history = '';
    // let ingredients = new FormArray([]);
    // let steps = new FormArray([]);

    // In Edit Mode:-
    if(this.editMode){
      // this._recipeService.getRecipeById(this.recipeId);
      this._recipeService.getRecipeById(this.recipeId)
      .subscribe(
        recipeData=>{          
          this.recipeForm.patchValue(recipeData.data)      

        }
        
      )
      
      
      
      
      // for(let ingredient of recipe.ingredients){
      //   ingredients.push(
      //     new FormGroup({
      //       'name': new FormControl(ingredient.name),
      //       'amount': new FormControl(ingredient.amount,[
      //         Validators.required,
      //         Validators.pattern(/^[1-9]+[0-9]*$/)
      //       ])
      //     })
      //   )
      // }

      // for(let step of recipe.steps){
      //   steps.push(
      //     new FormGroup({
      //       'step': new FormControl(null,[
      //         Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      //       ]),
      //       'stepTitle': new FormControl(null),
      //       'stepDetails': new FormControl(null)
      //     })
      //   )
      // }

    }
    
    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(recipeName, Validators.required),
      'recipeImg': new FormControl(recipeImg, { 
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      'servings': new FormControl(servings, Validators.required),
      'prepTime': new FormControl(prepTime),
      'cookingTime': new FormControl(cookingTime),
      'totalTiming': new FormControl(totalTiming, Validators.required),
      'briefIntro': new FormControl(briefIntro),
      'history': new FormControl(history),
      'nutritionInfo':new FormControl(nutritionInfo),
      // 'ingredients': ingredients,
      // 'steps': steps
    })

  }

  onSubmit(){
    if(this.recipeForm.invalid){
      console.log('form invalid');
    }
    else{
      if(this.editMode){
        console.log('from if(this.editMode){');
        
        // this._recipeService.updateRecipe(this.recipeId,this.recipeForm.value)
      }
      else{
        this._recipeService.addRecipe(this.recipeForm.value, this.recipeForm.value.recipeImg)
      }

      this.recipeForm.reset();

    }
    
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
           Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onAddStep(){
    (<FormArray> this.recipeForm.get('steps')).push(
      new FormGroup({
        'step': new FormControl(null,[
          Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'stepDetails': new FormControl(null)
      })
    )
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
  // get controls(){
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  // }

}
