export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  cuisine?: string;
  dietary?: string[];
  createdAt: string;
}

export interface RecipeInput {
  ingredients: string[];
  preferences?: {
    dietary?: string[];
    cuisine?: string;
    cookingTime?: string;
    servings?: number;
  };
}

export type DietaryPreference =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'pescatarian'
  | 'keto'
  | 'paleo';

export type CookingTime =
  | 'under-20'
  | 'under-30'
  | 'under-45'
  | 'under-60'
  | 'over-60';

export type MealType =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack'
  | 'dessert';
