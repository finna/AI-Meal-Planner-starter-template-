'use client';

import { Recipe } from '@/types/recipe';
import { BookmarkIcon, ChefHatIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { recipeStorage } from '@/lib/recipe-storage';

interface SavedRecipesSidebarProps {
  onSelectRecipe: (recipe: Recipe) => void;
  currentRecipeId?: string;
}

export default function SavedRecipesSidebar({
  onSelectRecipe,
  currentRecipeId,
}: SavedRecipesSidebarProps) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadSavedRecipes();
    // Listen for storage changes
    const handleStorageChange = () => loadSavedRecipes();
    window.addEventListener('recipe-saved', handleStorageChange);
    window.addEventListener('recipe-removed', handleStorageChange);
    return () => {
      window.removeEventListener('recipe-saved', handleStorageChange);
      window.removeEventListener('recipe-removed', handleStorageChange);
    };
  }, []);

  const loadSavedRecipes = () => {
    setSavedRecipes(recipeStorage.getSavedRecipes());
  };

  const handleRemoveRecipe = (recipeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    recipeStorage.removeRecipe(recipeId);
    window.dispatchEvent(new Event('recipe-removed'));
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-lime text-text-dark p-3 rounded-full shadow-lg"
      >
        <BookmarkIcon className="w-6 h-6" />
        {savedRecipes.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-text-dark text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {savedRecipes.length}
          </span>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 right-0 h-screen w-80 bg-white border-l border-cream-dark overflow-y-auto transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ChefHatIcon className="w-6 h-6 text-lime" />
              <h2 className="text-xl font-bold text-text-dark">Saved Recipes</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1 hover:bg-cream rounded"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {savedRecipes.length === 0 ? (
            <div className="text-center py-12 text-text-medium">
              <BookmarkIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No saved recipes yet</p>
              <p className="text-xs mt-1">
                Generate and save your favorite recipes!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => {
                    onSelectRecipe(recipe);
                    setIsOpen(false);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                    currentRecipeId === recipe.id
                      ? 'bg-lime text-text-dark'
                      : 'bg-cream hover:bg-cream-dark'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate">
                        {recipe.title}
                      </h3>
                      <p className="text-xs opacity-75 line-clamp-2">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs opacity-75">
                        <span>{recipe.prepTime}</span>
                        <span>•</span>
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemoveRecipe(recipe.id, e)}
                      className="p-1 hover:bg-white/50 rounded transition-colors flex-shrink-0"
                      aria-label="Remove recipe"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
