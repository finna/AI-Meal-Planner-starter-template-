# Component Architecture

## Component Tree

```
app/page.tsx (Main Application)
├── Header
│   ├── ChefHatIcon
│   └── Title & Description
│
├── Recipe Generator Form (White Card)
│   ├── IngredientInput
│   │   ├── Input Field
│   │   ├── Add Button (PlusIcon)
│   │   └── Ingredient Tags
│   │       └── Remove Buttons (XIcon)
│   │
│   ├── Divider
│   │
│   ├── PreferenceSelector
│   │   ├── Dietary Preferences Grid
│   │   │   └── Selection Buttons (CheckIcon)
│   │   ├── Meal Type Grid
│   │   │   └── Icon Buttons
│   │   ├── Cooking Time Grid
│   │   │   └── Time Buttons
│   │   └── Servings Counter
│   │       ├── Decrement Button
│   │       ├── Counter Display
│   │       └── Increment Button
│   │
│   ├── Error Message (conditional)
│   │
│   └── Generate Button
│       ├── Loading: Loader2Icon
│       └── Ready: SparklesIcon
│
├── Loading State (conditional)
│   ├── Loader2Icon (spinning)
│   └── Status Text
│
├── Recipe Display (conditional)
│   └── RecipeCard
│       ├── Header Section (Lime gradient background)
│       │   ├── Title & Description
│       │   ├── Bookmark Button (BookmarkIcon)
│       │   ├── Meta Info (ClockIcon, UsersIcon)
│       │   ├── Cuisine Tag
│       │   └── Dietary Tags
│       │
│       ├── Ingredients Section
│       │   └── Ingredient List Items
│       │       └── Bullet Points (lime dots)
│       │
│       ├── Instructions Section (Cream background)
│       │   └── Numbered Steps
│       │       └── Step Numbers (lime circles)
│       │
│       └── Footer
│           └── Creation Date (CheckIcon)
│
└── Empty State (conditional)
    ├── SparklesIcon
    └── Prompt Text

SavedRecipesSidebar (Sticky/Fixed)
├── Mobile Toggle Button (fixed)
│   ├── BookmarkIcon
│   └── Recipe Count Badge
│
├── Sidebar Panel
│   ├── Header
│   │   ├── ChefHatIcon
│   │   ├── Title
│   │   └── Close Button (XIcon) - mobile only
│   │
│   ├── Empty State (conditional)
│   │   ├── BookmarkIcon
│   │   └── Empty Message
│   │
│   └── Recipe List
│       └── Recipe Cards
│           ├── Title
│           ├── Description
│           ├── Meta Info
│           └── Remove Button (XIcon)
│
└── Mobile Backdrop (overlay)
```

## State Flow

### Ingredient Management
```
User types → Input value state → Enter/Click Add
  → Validate (non-empty, no duplicates)
  → Add to ingredients array
  → Clear input
  → Re-render tags

User clicks X on tag
  → Filter out ingredient
  → Update ingredients array
  → Re-render
```

### Preference Selection
```
User clicks dietary option
  → Toggle in dietary array
  → Update preferences state
  → Visual feedback (lime highlight + checkmark)

User clicks meal type
  → Set as single selection (toggle off if same)
  → Update preferences state
  → Visual feedback

User clicks cooking time
  → Set as single selection (toggle off if same)
  → Update preferences state
  → Visual feedback

User clicks +/- on servings
  → Increment/decrement (min: 1)
  → Update preferences state
  → Display updated count
```

### Recipe Generation Flow
```
User clicks Generate Recipe
  ↓
Validate ingredients exist
  ↓
Set isGenerating = true
  ↓
Show loading state (spinning icon)
  ↓
POST /api/generate-recipe
  ├── ingredients array
  └── preferences object
  ↓
API builds prompt with preferences
  ↓
Call OpenAI GPT-4
  ↓
Parse JSON response
  ↓
Return Recipe object
  ↓
Set currentRecipe state
  ↓
Set isGenerating = false
  ↓
Render RecipeCard with fadeIn animation
```

### Recipe Saving Flow
```
User clicks bookmark icon on RecipeCard
  ↓
Check if already saved (isSaved state)
  ↓
If not saved:
  ├── Add to localStorage
  ├── Dispatch 'recipe-saved' event
  └── Update isSaved = true
  ↓
If saved:
  ├── Remove from localStorage
  ├── Dispatch 'recipe-removed' event
  └── Update isSaved = false
  ↓
Sidebar listens for events
  ↓
Reload saved recipes from storage
  ↓
Update sidebar display
```

### Saved Recipe Selection
```
User clicks recipe in sidebar
  ↓
Callback to parent (page.tsx)
  ↓
Set currentRecipe to selected recipe
  ↓
Close sidebar (mobile)
  ↓
Scroll to top
  ↓
Display recipe in main area
```

## Props & Interfaces

### IngredientInput
```typescript
interface IngredientInputProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
}
```

### PreferenceSelector
```typescript
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
```

### RecipeCard
```typescript
interface RecipeCardProps {
  recipe: Recipe;
}

interface Recipe {
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
```

### SavedRecipesSidebar
```typescript
interface SavedRecipesSidebarProps {
  onSelectRecipe: (recipe: Recipe) => void;
  currentRecipeId?: string;
}
```

## Event System

### Custom Events
```typescript
// Fired when recipe is saved
window.dispatchEvent(new Event('recipe-saved'));

// Fired when recipe is removed
window.dispatchEvent(new Event('recipe-removed'));

// Listeners
window.addEventListener('recipe-saved', loadSavedRecipes);
window.addEventListener('recipe-removed', loadSavedRecipes);
```

## Styling Patterns

### Button States
```
Default:    bg-white border-cream-dark
Hover:      border-lime/50
Selected:   bg-lime border-lime + CheckIcon
Disabled:   bg-cream-dark cursor-not-allowed
Loading:    Loader2Icon spinning
```

### Card Patterns
```
Container:  bg-white rounded-2xl border-2 border-cream-dark
Section:    p-6 sm:p-8
Divider:    border-t-2 border-cream-dark
Shadow:     shadow-sm hover:shadow-md
```

### Responsive Breakpoints
```
Mobile:     < 768px  (sm:)
Tablet:     768px+   (md:)
Desktop:    1024px+  (lg:)
```

### Animation Classes
```css
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Icon Usage

All icons from lucide-react:

- `ChefHatIcon` - App branding, sidebar header
- `BookmarkIcon` - Save recipe, sidebar indicator
- `PlusIcon` - Add ingredient
- `XIcon` - Remove ingredient, close sidebar, delete saved recipe
- `CheckIcon` - Selected preferences, recipe footer
- `ClockIcon` - Cooking time display
- `UsersIcon` - Servings display
- `SparklesIcon` - Generate button, empty state
- `Loader2Icon` - Loading states (with animate-spin)

## Color Usage by Component

### IngredientInput
- Input: white background, cream-dark border, lime focus
- Tags: white background, cream-dark border
- Button: lime background, lime-light hover

### PreferenceSelector
- Inactive: white background, cream-dark border
- Active: lime background, lime border
- Icons: emoji or text-based

### RecipeCard
- Header: lime/10 gradient background
- Body: white background
- Instructions: cream/30 background
- Accents: lime (bullets, numbers, tags)

### SavedRecipesSidebar
- Background: white
- Border: cream-dark
- Selected recipe: lime background
- Inactive recipes: cream background, cream-dark hover
- Badge: text-dark background, white text

This architecture ensures a clean separation of concerns, predictable state flow, and maintainable component structure.
