'use client';

import { useState } from 'react';
import { Recipe, DietaryPreference, CookingTime, MealType } from '@/types/recipe';
import IngredientInput from '@/components/IngredientInput';
import PreferenceSelector from '@/components/PreferenceSelector';
import RecipeCard from '@/components/RecipeCard';
import SavedRecipesSidebar from '@/components/SavedRecipesSidebar';
import { ChefHatIcon, Loader2Icon, SparklesIcon } from 'lucide-react';

interface Preferences {
  dietary: DietaryPreference[];
  cookingTime?: CookingTime;
  mealType?: MealType;
  servings: number;
}

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<Preferences>({
    dietary: [],
    servings: 4,
  });
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          preferences: {
            dietary: preferences.dietary,
            mealType: preferences.mealType,
            cookingTime: preferences.cookingTime,
            servings: preferences.servings,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate recipe');
      }

      setCurrentRecipe(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectSavedRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    // Scroll to top to show the recipe
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ChefHatIcon className="w-10 h-10 sm:w-12 sm:h-12 text-lime" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark">
                AI Meal Planner
              </h1>
            </div>
            <p className="text-text-medium text-sm sm:text-base max-w-2xl mx-auto">
              Transform your ingredients into delicious recipes. Enter what you have in
              your pantry, and let AI create the perfect meal for you.
            </p>
          </div>

          {/* Recipe Generator Form */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-cream-dark p-6 sm:p-8 mb-8">
            <div className="space-y-6">
              <IngredientInput
                ingredients={ingredients}
                onChange={setIngredients}
              />

              <div className="border-t-2 border-cream-dark pt-6">
                <PreferenceSelector
                  preferences={preferences}
                  onChange={setPreferences}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleGenerateRecipe}
                disabled={isGenerating || ingredients.length === 0}
                className="w-full bg-lime hover:bg-lime-light disabled:bg-cream-dark disabled:cursor-not-allowed text-text-dark font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 text-lg shadow-sm hover:shadow-md"
              >
                {isGenerating ? (
                  <>
                    <Loader2Icon className="w-6 h-6 animate-spin" />
                    Generating Your Recipe...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-6 h-6" />
                    Generate Recipe
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isGenerating && (
            <div className="text-center py-12">
              <Loader2Icon className="w-12 h-12 animate-spin text-lime mx-auto mb-4" />
              <p className="text-text-medium">Creating your perfect recipe...</p>
            </div>
          )}

          {/* Recipe Display */}
          {currentRecipe && !isGenerating && (
            <div className="animate-fadeIn">
              <RecipeCard recipe={currentRecipe} />
            </div>
          )}

          {/* Empty State */}
          {!currentRecipe && !isGenerating && ingredients.length > 0 && (
            <div className="text-center py-12 text-text-medium">
              <SparklesIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Ready to create something delicious?</p>
              <p className="text-sm mt-1">Click Generate Recipe to get started!</p>
            </div>
          )}
        </div>
      </main>

      {/* Sidebar */}
      <SavedRecipesSidebar
        onSelectRecipe={handleSelectSavedRecipe}
        currentRecipeId={currentRecipe?.id}
      />
    </div>
  );
}
