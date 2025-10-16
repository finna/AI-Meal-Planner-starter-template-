'use client';

import { Recipe } from '@/types/recipe';
import { ClockIcon, UsersIcon, BookmarkIcon, CheckIcon } from 'lucide-react';
import { recipeStorage } from '@/lib/recipe-storage';
import { useState, useEffect } from 'react';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(recipeStorage.isRecipeSaved(recipe.id));
  }, [recipe.id]);

  const handleSaveToggle = () => {
    if (isSaved) {
      recipeStorage.removeRecipe(recipe.id);
      window.dispatchEvent(new Event('recipe-removed'));
      setIsSaved(false);
    } else {
      recipeStorage.saveRecipe(recipe);
      window.dispatchEvent(new Event('recipe-saved'));
      setIsSaved(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-cream-dark overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-lime/10 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-dark mb-2">
              {recipe.title}
            </h2>
            <p className="text-text-medium text-sm sm:text-base">
              {recipe.description}
            </p>
          </div>
          <button
            onClick={handleSaveToggle}
            className={`p-3 rounded-full transition-all flex-shrink-0 ${
              isSaved
                ? 'bg-lime text-text-dark'
                : 'bg-white border-2 border-cream-dark hover:border-lime text-text-medium'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save recipe'}
          >
            <BookmarkIcon className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-text-medium">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            <span>
              Prep: {recipe.prepTime} • Cook: {recipe.cookTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
          {recipe.cuisine && (
            <div className="px-3 py-1 bg-lime/20 rounded-full text-text-dark font-medium">
              {recipe.cuisine}
            </div>
          )}
        </div>

        {/* Dietary Tags */}
        {recipe.dietary && recipe.dietary.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {recipe.dietary.map((diet) => (
              <span
                key={diet}
                className="px-3 py-1 bg-white rounded-full text-xs font-medium text-text-dark border border-cream-dark"
              >
                {diet}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Ingredients */}
      <div className="p-6 sm:p-8 border-t-2 border-cream-dark">
        <h3 className="text-xl font-bold text-text-dark mb-4">Ingredients</h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-3 text-text-dark">
              <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-lime" />
              </div>
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="p-6 sm:p-8 border-t-2 border-cream-dark bg-cream/30">
        <h3 className="text-xl font-bold text-text-dark mb-4">Instructions</h3>
        <ol className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-lime flex items-center justify-center font-bold text-text-dark">
                {index + 1}
              </div>
              <p className="text-text-dark flex-1 pt-1">{instruction}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <div className="p-6 sm:p-8 border-t-2 border-cream-dark bg-lime/5">
        <div className="flex items-center gap-2 text-sm text-text-medium">
          <CheckIcon className="w-4 h-4 text-lime" />
          <span>Recipe generated on {new Date(recipe.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
