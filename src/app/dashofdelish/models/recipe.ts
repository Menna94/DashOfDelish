export interface Recipe {
    id:string,
    recipeName: string,
    recipeImg?:string,
    createdAt?: Date,
    servings: number,
    prepTime?:string,
    cookingTime?:string,
    totalTiming:string,
    briefIntro: string,
    history?: string,
    nutritionInfo?:string,
    ingredients: [
        {
            name:string, 
            amount:number
        }
    ],
    directions: [
        {
            step: number,
            stepTitle?: string,
            stepDetails:string
        }
    ]
}
