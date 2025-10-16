# Quick Start Guide

Get your AI Meal Planner up and running in 5 minutes!

## Step 1: Get an OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (you won't be able to see it again!)

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and paste your API key:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

## Step 4: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Generate Your First Recipe!

1. Add some ingredients (e.g., "chicken", "rice", "broccoli")
2. Optionally set your preferences (dietary requirements, cooking time, etc.)
3. Click "Generate Recipe"
4. Enjoy your AI-generated recipe!
5. Click the bookmark icon to save recipes you love

## Troubleshooting

### "OpenAI API key not configured" error
- Make sure you created the `.env.local` file
- Check that your API key is correct (starts with `sk-`)
- Restart the dev server after adding the key

### Build errors
```bash
# Try clearing the Next.js cache
rm -rf .next
npm run build
```

### Port 3000 already in use
```bash
# Run on a different port
PORT=3001 npm run dev
```

## Next Steps

- Deploy to Vercel for free hosting
- Customize the colors in `app/globals.css`
- Add more preference options
- Share your favorite recipes!

## Cost Information

The app uses GPT-4, which costs approximately:
- $0.01-0.03 per recipe generation
- OpenAI gives $5 in free credits to new accounts
- That's roughly 150-500 free recipes!

Monitor your usage at [https://platform.openai.com/usage](https://platform.openai.com/usage)
