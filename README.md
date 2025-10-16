# AI Meal Planner

A beautiful, AI-powered meal planning application that transforms your pantry ingredients into delicious recipes. Built with Next.js, TypeScript, and the OpenAI GPT-4 API.

## Features

- **Ingredient-Based Recipe Generation**: Enter what you have in your pantry and get custom recipes
- **Smart Preferences**: Filter by dietary requirements, meal type, cooking time, and servings
- **Save Recipes**: Bookmark your favorite recipes to a sidebar for easy access
- **Beautiful Design**: Clean, HelloFresh-inspired UI with warm colors and smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **No Chat Interface**: Recipes displayed like a professional cooking website, not an AI chat

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: OpenAI GPT-4 API
- **Icons**: Lucide React
- **Storage**: localStorage (for saved recipes)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd meal-planner-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Add Ingredients**: Enter the ingredients you have available
2. **Set Preferences** (optional): Choose dietary requirements, meal type, cooking time, and servings
3. **Generate Recipe**: Click the "Generate Recipe" button
4. **Save Your Favorites**: Click the bookmark icon to save recipes to the sidebar
5. **View Saved Recipes**: Access your saved recipes from the sidebar anytime

## Project Structure

```
meal-planner-app/
├── app/
│   ├── api/
│   │   └── generate-recipe/
│   │       └── route.ts          # OpenAI API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles & theme
├── components/
│   ├── IngredientInput.tsx       # Ingredient tag input
│   ├── PreferenceSelector.tsx    # Dietary & preference filters
│   ├── RecipeCard.tsx            # Recipe display component
│   └── SavedRecipesSidebar.tsx   # Saved recipes sidebar
├── lib/
│   └── recipe-storage.ts         # localStorage helper
├── types/
│   └── recipe.ts                 # TypeScript interfaces
└── .env.local.example            # Environment variables template
```

## Design Philosophy

This app is designed to feel like a real cooking website, not a typical AI chat interface:

- Clean card-based layouts
- Warm, inviting color palette (lime green & cream)
- Clear typography with good hierarchy
- Generous whitespace
- Smooth, subtle animations
- Professional recipe presentation

## API Usage

The app uses the OpenAI GPT-4 API. Each recipe generation costs approximately $0.01-0.03 depending on the length of the response. Monitor your usage in the [OpenAI dashboard](https://platform.openai.com/usage).

## Customization

### Colors

Edit the color variables in `app/globals.css`:

```css
:root {
  --lime: #C4D600;
  --cream: #F5F3EE;
  /* ... */
}
```

### OpenAI Model

Change the model in `app/api/generate-recipe/route.ts`:

```typescript
model: 'gpt-4o', // or 'gpt-4-turbo', 'gpt-3.5-turbo', etc.
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add your `OPENAI_API_KEY` in the Environment Variables section
4. Deploy!

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Node.js:

- Netlify
- AWS Amplify
- Railway
- Render

Make sure to set the `OPENAI_API_KEY` environment variable in your deployment platform.

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgments

- Design inspired by HelloFresh
- Built with [Next.js](https://nextjs.org)
- Powered by [OpenAI](https://openai.com)
