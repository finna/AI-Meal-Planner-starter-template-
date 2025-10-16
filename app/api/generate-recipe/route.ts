import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Recipe } from '@/types/recipe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients, preferences } = body;

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one ingredient' },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add your API key to the .env.local file.' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client inside the handler
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build the prompt for GPT-4
    let prompt = `Create a delicious recipe using the following ingredients: ${ingredients.join(', ')}.`;

    if (preferences?.dietary && preferences.dietary.length > 0) {
      prompt += ` The recipe should be ${preferences.dietary.join(', ')}.`;
    }

    if (preferences?.mealType) {
      prompt += ` This should be a ${preferences.mealType} recipe.`;
    }

    if (preferences?.cookingTime) {
      const timeMap: Record<string, string> = {
        'under-20': '20 minutes',
        'under-30': '30 minutes',
        'under-45': '45 minutes',
        'under-60': '1 hour',
        'over-60': 'over 1 hour',
      };
      prompt += ` Total cooking time should be under ${timeMap[preferences.cookingTime]}.`;
    }

    if (preferences?.servings) {
      prompt += ` The recipe should serve ${preferences.servings} people.`;
    }

    prompt += `

Please respond with a JSON object in this exact format:
{
  "title": "Recipe Name",
  "description": "A brief, appetizing description of the dish (1-2 sentences)",
  "ingredients": ["ingredient 1 with measurements", "ingredient 2 with measurements", ...],
  "instructions": ["Step 1", "Step 2", ...],
  "prepTime": "X minutes",
  "cookTime": "X minutes",
  "servings": number,
  "cuisine": "cuisine type",
  "dietary": ["dietary restriction 1", "dietary restriction 2", ...]
}

Make sure the recipe is creative, delicious, and uses the provided ingredients as the main components. You can suggest additional common pantry items if needed.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional chef and recipe creator. Generate creative, delicious recipes based on available ingredients. Always respond with valid JSON only, no additional text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0].message.content;

    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    // Strip markdown code blocks if present (```json ... ``` or ``` ... ```)
    let cleanedResponse = responseText.trim();
    if (cleanedResponse.startsWith('```')) {
      // Remove opening ```json or ```
      cleanedResponse = cleanedResponse.replace(/^```(?:json)?\s*\n/, '');
      // Remove closing ```
      cleanedResponse = cleanedResponse.replace(/\n```\s*$/, '');
    }

    // Parse the JSON response
    const recipeData = JSON.parse(cleanedResponse);

    // Create the recipe object with a unique ID
    const recipe: Recipe = {
      id: `recipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: recipeData.title,
      description: recipeData.description,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      servings: recipeData.servings || preferences?.servings || 4,
      cuisine: recipeData.cuisine,
      dietary: recipeData.dietary || [],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error generating recipe:', error);

    // Check if it's an OpenAI API error
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API key not configured. Please add your API key to the .env.local file.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate recipe. Please try again.' },
      { status: 500 }
    );
  }
}
