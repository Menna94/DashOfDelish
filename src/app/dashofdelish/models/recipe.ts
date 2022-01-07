export interface Recipe {
    id:string,
    recipeName: string,
    recipeImg?:string,

    servings: number,
    prepTime?:string,
    cookingTime?:string,
    totalTiming:string,
    briefIntro: string,
    history?: string,
    nutritionInfo?:string,
    ingredients?: [{name:string, amount:number}],
    // steps: string[]
}
