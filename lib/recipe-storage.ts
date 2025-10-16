import { Recipe } from '@/types/recipe';

const STORAGE_KEY = 'saved-recipes';

export const recipeStorage = {
  getSavedRecipes: (): Recipe[] => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error reading saved recipes:', error);
      return [];
    }
  },

  saveRecipe: (recipe: Recipe): void => {
    if (typeof window === 'undefined') return;
    try {
      const saved = recipeStorage.getSavedRecipes();
      const updated = [recipe, ...saved];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  },

  removeRecipe: (recipeId: string): void => {
    if (typeof window === 'undefined') return;
    try {
      const saved = recipeStorage.getSavedRecipes();
      const updated = saved.filter((r) => r.id !== recipeId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  },

  isRecipeSaved: (recipeId: string): boolean => {
    const saved = recipeStorage.getSavedRecipes();
    return saved.some((r) => r.id === recipeId);
  },
};
