'use client';

import { DietaryPreference, CookingTime, MealType } from '@/types/recipe';
import { CheckIcon } from 'lucide-react';

interface Preferences {
  dietary: DietaryPreference[];
  cookingTime?: CookingTime;
  mealType?: MealType;
  servings: number;
}

interface PreferenceSelectorProps {
  preferences: Preferences;
  onChange: (preferences: Preferences) => void;
}

const dietaryOptions: { value: DietaryPreference; label: string; icon: string }[] = [
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥕' },
  { value: 'vegan', label: 'Vegan', icon: '🌱' },
  { value: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
  { value: 'dairy-free', label: 'Dairy-Free', icon: '🥛' },
  { value: 'pescatarian', label: 'Pescatarian', icon: '🐟' },
  { value: 'keto', label: 'Keto', icon: '🥑' },
  { value: 'paleo', label: 'Paleo', icon: '🍖' },
];

const cookingTimeOptions: { value: CookingTime; label: string }[] = [
  { value: 'under-20', label: 'Under 20 min' },
  { value: 'under-30', label: 'Under 30 min' },
  { value: 'under-45', label: 'Under 45 min' },
  { value: 'under-60', label: 'Under 1 hour' },
];

const mealTypeOptions: { value: MealType; label: string; icon: string }[] = [
  { value: 'breakfast', label: 'Breakfast', icon: '🍳' },
  { value: 'lunch', label: 'Lunch', icon: '🥗' },
  { value: 'dinner', label: 'Dinner', icon: '🍽️' },
  { value: 'snack', label: 'Snack', icon: '🍪' },
  { value: 'dessert', label: 'Dessert', icon: '🍰' },
];

export default function PreferenceSelector({
  preferences,
  onChange,
}: PreferenceSelectorProps) {
  const toggleDietary = (diet: DietaryPreference) => {
    const newDietary = preferences.dietary.includes(diet)
      ? preferences.dietary.filter((d) => d !== diet)
      : [...preferences.dietary, diet];
    onChange({ ...preferences, dietary: newDietary });
  };

  const setCookingTime = (time: CookingTime) => {
    onChange({
      ...preferences,
      cookingTime: preferences.cookingTime === time ? undefined : time,
    });
  };

  const setMealType = (meal: MealType) => {
    onChange({
      ...preferences,
      mealType: preferences.mealType === meal ? undefined : meal,
    });
  };

  const setServings = (servings: number) => {
    onChange({ ...preferences, servings });
  };

  return (
    <div className="space-y-6">
      {/* Dietary Preferences */}
      <div>
        <label className="block text-sm font-medium text-text-dark mb-3">
          Dietary Preferences (optional)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {dietaryOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleDietary(option.value)}
              className={`p-3 rounded-xl text-sm font-medium transition-all ${
                preferences.dietary.includes(option.value)
                  ? 'bg-lime text-text-dark border-2 border-lime'
                  : 'bg-white text-text-dark border-2 border-cream-dark hover:border-lime/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span>{option.icon}</span>
                  <span className="truncate">{option.label}</span>
                </div>
                {preferences.dietary.includes(option.value) && (
                  <CheckIcon className="w-4 h-4 flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Meal Type */}
      <div>
        <label className="block text-sm font-medium text-text-dark mb-3">
          Meal Type (optional)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {mealTypeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setMealType(option.value)}
              className={`p-3 rounded-xl text-sm font-medium transition-all ${
                preferences.mealType === option.value
                  ? 'bg-lime text-text-dark border-2 border-lime'
                  : 'bg-white text-text-dark border-2 border-cream-dark hover:border-lime/50'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">{option.icon}</span>
                <span className="text-xs">{option.label}</span>
                {preferences.mealType === option.value && (
                  <CheckIcon className="w-3 h-3" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cooking Time & Servings */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Cooking Time */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-3">
            Cooking Time (optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {cookingTimeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCookingTime(option.value)}
                className={`p-3 rounded-xl text-sm font-medium transition-all ${
                  preferences.cookingTime === option.value
                    ? 'bg-lime text-text-dark border-2 border-lime'
                    : 'bg-white text-text-dark border-2 border-cream-dark hover:border-lime/50'
                }`}
              >
                {option.label}
                {preferences.cookingTime === option.value && (
                  <CheckIcon className="w-4 h-4 inline-block ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Servings */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-3">
            Servings
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setServings(Math.max(1, preferences.servings - 1))}
              className="w-12 h-12 bg-white border-2 border-cream-dark hover:border-lime rounded-xl font-bold text-text-dark transition-colors"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <div className="text-3xl font-bold text-text-dark">
                {preferences.servings}
              </div>
              <div className="text-xs text-text-medium">servings</div>
            </div>
            <button
              onClick={() => setServings(preferences.servings + 1)}
              className="w-12 h-12 bg-white border-2 border-cream-dark hover:border-lime rounded-xl font-bold text-text-dark transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
