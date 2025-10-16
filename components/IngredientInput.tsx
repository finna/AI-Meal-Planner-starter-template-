'use client';

import { useState, KeyboardEvent } from 'react';
import { XIcon, PlusIcon } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
}

export default function IngredientInput({
  ingredients,
  onChange,
}: IngredientInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      onChange([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    onChange(ingredients.filter((i) => i !== ingredient));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text-dark">
        What ingredients do you have?
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., chicken, tomatoes, garlic..."
          className="flex-1 px-4 py-3 rounded-xl bg-white border-2 border-cream-dark focus:border-lime focus:outline-none transition-colors text-text-dark placeholder:text-text-medium/50"
        />
        <button
          onClick={handleAddIngredient}
          disabled={!inputValue.trim()}
          className="px-6 py-3 bg-lime hover:bg-lime-light disabled:bg-cream-dark disabled:cursor-not-allowed text-text-dark font-medium rounded-xl transition-colors flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-cream-dark text-text-dark text-sm"
            >
              <span>{ingredient}</span>
              <button
                onClick={() => handleRemoveIngredient(ingredient)}
                className="p-0.5 hover:bg-cream rounded-full transition-colors"
                aria-label={`Remove ${ingredient}`}
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {ingredients.length > 0 && (
        <p className="text-xs text-text-medium">
          {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} added
        </p>
      )}
    </div>
  );
}
