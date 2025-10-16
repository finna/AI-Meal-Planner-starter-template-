# Troubleshooting Guide

Common issues and their solutions for the AI Meal Planner app.

## Setup Issues

### "Cannot find module" errors

**Problem**: Import errors when starting the dev server

**Solutions**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

### "OpenAI API key not configured" error

**Problem**: API key not being read by the application

**Solutions**:
1. Verify `.env.local` file exists in the root directory
2. Check the file name is exactly `.env.local` (not `.env.local.txt`)
3. Ensure the key starts with `sk-`
4. Restart the dev server after adding the key
5. Check there are no extra spaces: `OPENAI_API_KEY=sk-xxx` (no spaces around =)

**Verify your setup**:
```bash
# Check if .env.local exists
ls -la .env.local

# View the file (without exposing the key)
head -c 30 .env.local && echo "..."
```

### Port 3000 already in use

**Problem**: Another service is using port 3000

**Solution**:
```bash
# Option 1: Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Use a different port
PORT=3001 npm run dev
```

### Build fails with TypeScript errors

**Problem**: Type errors preventing build

**Solutions**:
```bash
# Check for type errors
npx tsc --noEmit

# Ensure all dependencies are installed
npm install

# Update TypeScript
npm install typescript@latest --save-dev
```

## Runtime Issues

### Recipe generation fails

**Problem**: Error when clicking "Generate Recipe"

**Possible Causes & Solutions**:

1. **No API Key**
   - Error: "OpenAI API key not configured"
   - Solution: Add `OPENAI_API_KEY` to `.env.local` and restart server

2. **Invalid API Key**
   - Error: "Invalid API key"
   - Solution: Get a new key from [platform.openai.com](https://platform.openai.com/api-keys)

3. **Insufficient Credits**
   - Error: "You exceeded your current quota"
   - Solution: Add billing information or purchase credits at [platform.openai.com/billing](https://platform.openai.com/billing)

4. **Rate Limit**
   - Error: "Rate limit exceeded"
   - Solution: Wait a moment and try again, or upgrade your OpenAI plan

5. **Network Error**
   - Error: "Failed to fetch" or timeout
   - Solution: Check internet connection, try again

### Saved recipes not persisting

**Problem**: Recipes disappear after page refresh

**Possible Causes**:

1. **Browser Private/Incognito Mode**
   - localStorage doesn't persist in private mode
   - Solution: Use normal browser window

2. **Browser Settings**
   - Cookies/localStorage disabled
   - Solution: Enable localStorage in browser settings

3. **Different Browser/Device**
   - localStorage is per-browser
   - Solution: This is expected behavior (use database for cross-device sync)

**Debug localStorage**:
```javascript
// Open browser console and run:
localStorage.getItem('saved-recipes')
```

### Styles not applying correctly

**Problem**: Components look broken or unstyled

**Solutions**:
```bash
# Clear Tailwind cache
rm -rf .next

# Rebuild
npm run build

# Check for CSS conflicts in browser DevTools
```

### Icons not showing

**Problem**: Lucide icons not rendering

**Solutions**:
```bash
# Reinstall lucide-react
npm uninstall lucide-react
npm install lucide-react

# Check import paths are correct
# Should be: import { IconName } from 'lucide-react'
```

## Performance Issues

### Slow recipe generation

**Expected Behavior**: GPT-4 takes 5-15 seconds to generate a recipe

**If slower than 20 seconds**:
- Check internet connection speed
- Verify OpenAI service status at [status.openai.com](https://status.openai.com)
- Consider using GPT-3.5-turbo for faster (but lower quality) responses

**To use faster model**:
Edit `app/api/generate-recipe/route.ts`:
```typescript
model: 'gpt-3.5-turbo', // Instead of 'gpt-4o'
```

### App feels sluggish

**Solutions**:
```bash
# Use production build for better performance
npm run build
npm start

# Check for memory leaks in browser DevTools
# Performance > Memory
```

### Large bundle size

**Current size**: ~118 kB (this is good!)

**If significantly larger**:
```bash
# Analyze bundle
npm run build

# Check for duplicate dependencies
npm dedupe
```

## Mobile Issues

### Sidebar not working on mobile

**Problem**: Sidebar doesn't open or close

**Solutions**:
1. Check for JavaScript errors in mobile browser console
2. Verify touch events work (try tapping bookmark button)
3. Clear mobile browser cache
4. Try different mobile browser

**Debug on mobile**:
- iOS Safari: Settings > Safari > Advanced > Web Inspector
- Android Chrome: chrome://inspect on desktop

### Layout broken on mobile

**Problem**: Elements overlapping or cut off

**Solutions**:
1. Check viewport meta tag in `app/layout.tsx`
2. Test responsive breakpoints in browser DevTools
3. Verify Tailwind responsive classes (`sm:`, `md:`, `lg:`)

### Inputs not working on iOS

**Problem**: Keyboard doesn't appear or input is blocked

**Solutions**:
1. Check for `inputMode` attributes
2. Verify no CSS `user-select: none` on inputs
3. Test on actual iOS device, not just simulator

## API Issues

### "Invalid JSON" errors

**Problem**: OpenAI returns malformed JSON

**This is rare, but possible**:
```typescript
// Add to route.ts error handling:
try {
  const recipeData = JSON.parse(responseText);
} catch (parseError) {
  console.error('Raw response:', responseText);
  // Show user-friendly error
}
```

### Unexpected recipe results

**Problem**: Recipes don't match ingredients or preferences

**Solutions**:
1. Check prompt construction in `app/api/generate-recipe/route.ts`
2. Increase temperature for more creativity (0.8 is current)
3. Add more specific instructions to the system prompt
4. Verify all preferences are being passed correctly

### High API costs

**Problem**: Spending too much on OpenAI API

**Monitor usage**:
- [platform.openai.com/usage](https://platform.openai.com/usage)

**Reduce costs**:
1. Use `gpt-3.5-turbo` instead of `gpt-4o`
2. Reduce `max_tokens` in API call (current: 2000)
3. Add caching for similar requests
4. Implement rate limiting

## Development Issues

### Hot reload not working

**Problem**: Changes don't reflect in browser

**Solutions**:
```bash
# Restart dev server
# Ctrl+C then npm run dev

# Clear Next.js cache
rm -rf .next

# Check for syntax errors in console
```

### ESLint errors

**Problem**: Linting warnings/errors

**Solutions**:
```bash
# Run linter
npm run lint

# Auto-fix issues
npx eslint . --fix

# Disable specific rules if needed (in eslint.config.mjs)
```

### TypeScript errors in IDE

**Problem**: Red squiggles in VS Code

**Solutions**:
1. Restart TypeScript server: Cmd+Shift+P > "TypeScript: Restart TS Server"
2. Check `tsconfig.json` is valid
3. Run `npm install` to update type definitions
4. Verify imports are correct

## Browser-Specific Issues

### Safari issues

**localStorage quota**: Safari has strict limits
- Max 5-10 MB typically
- Solution: Limit saved recipes or use database

**Cookie blocking**: Safari's strict privacy settings
- May block localStorage in some cases
- Solution: Check Safari privacy settings

### Firefox issues

**DevTools not showing network**:
- Open Network tab before triggering requests
- Refresh page with Network tab open

### Chrome issues

**CORS errors** (shouldn't happen with Next.js):
- Next.js API routes auto-handle CORS
- If you see CORS errors, check API route setup

## Deployment Issues (Vercel)

### Build fails on Vercel

**Solutions**:
1. Check build logs for specific error
2. Verify all environment variables are set
3. Ensure Node.js version compatibility
4. Check `package.json` has all dependencies

### Environment variables not working

**Solutions**:
1. Redeploy after adding environment variables
2. Check variable names match exactly (case-sensitive)
3. Verify variables are added to correct environment (Production/Preview)

### App works locally but not in production

**Common causes**:
1. Missing environment variables
2. Different Node.js versions
3. File path issues (case-sensitive in production)
4. Missing dependencies in `package.json`

## Getting Help

Still stuck? Here's how to get help:

### 1. Check Browser Console
```
Right-click > Inspect > Console tab
Look for error messages
```

### 2. Check Server Logs
```bash
# Development
npm run dev
# Watch for errors in terminal
```

### 3. Verify API Key
```bash
# Test API key with curl
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### 4. Create Minimal Reproduction
- Create new issue with minimal code to reproduce
- Include error messages
- Specify browser and OS

### 5. Check Dependencies
```bash
# List versions
npm list

# Check for updates
npm outdated
```

## Debug Mode

Enable detailed logging:

```typescript
// In app/api/generate-recipe/route.ts
console.log('Request body:', body);
console.log('Generated prompt:', prompt);
console.log('OpenAI response:', responseText);
```

## Reset Everything

Nuclear option - fresh start:

```bash
# Delete everything
rm -rf node_modules .next package-lock.json

# Reinstall
npm install

# Rebuild
npm run build

# Test
npm run dev
```

## Useful Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# View environment variables (careful with keys!)
env | grep OPENAI

# Test production build locally
npm run build && npm start

# Check package versions
npm list --depth=0

# Clean install
npm ci
```

## Known Limitations

1. **localStorage**: Saved recipes only persist in same browser
2. **No Auth**: Anyone can use the app if they access it
3. **API Costs**: Each recipe costs $0.01-0.03
4. **Mobile Safari**: May have localStorage quirks
5. **Rate Limits**: OpenAI enforces rate limits based on your tier

## Still Need Help?

If none of these solutions work:

1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Review the [OpenAI API Documentation](https://platform.openai.com/docs)
3. Search for similar issues on GitHub
4. Create a detailed bug report with:
   - Error messages
   - Steps to reproduce
   - Browser and OS
   - Console output
   - Network tab screenshots

---

Most issues can be solved by:
1. Restarting the dev server
2. Checking the API key
3. Clearing the cache
4. Reading error messages carefully

Good luck debugging! 🔧
