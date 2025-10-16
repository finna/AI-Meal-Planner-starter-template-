# Deployment Checklist

Before deploying your AI Meal Planner to production, ensure all items are checked:

## Pre-Deployment

### Environment Setup
- [ ] OpenAI API key obtained from [platform.openai.com](https://platform.openai.com/api-keys)
- [ ] `.env.local` file created with `OPENAI_API_KEY`
- [ ] API key tested and working locally
- [ ] Billing set up on OpenAI account (or using free credits)

### Code Quality
- [ ] All TypeScript files compile without errors (`npm run build`)
- [ ] No console errors in browser DevTools
- [ ] All components render correctly
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] All features tested:
  - [ ] Add/remove ingredients
  - [ ] Select preferences
  - [ ] Generate recipe
  - [ ] Save recipe
  - [ ] View saved recipes
  - [ ] Remove saved recipe
  - [ ] Select saved recipe from sidebar

### Performance
- [ ] Build completes successfully (`npm run build`)
- [ ] No warnings in build output
- [ ] Bundle size is reasonable (~118 kB First Load JS)
- [ ] Images optimized (if any added)
- [ ] No memory leaks in client-side code

### Documentation
- [ ] README.md is complete and accurate
- [ ] QUICKSTART.md provides clear setup instructions
- [ ] API usage and costs documented
- [ ] License information included (if applicable)

## Deployment to Vercel

### Initial Setup
- [ ] Code pushed to GitHub repository
- [ ] Repository is public or Vercel has access
- [ ] Vercel account created

### Vercel Configuration
1. [ ] Import project from GitHub
2. [ ] Framework preset: Next.js (auto-detected)
3. [ ] Root directory: `./` (default)
4. [ ] Build command: `npm run build` (default)
5. [ ] Output directory: `.next` (default)

### Environment Variables
- [ ] Add `OPENAI_API_KEY` in Vercel project settings
- [ ] Value matches working local API key
- [ ] Environment: Production (and Preview if desired)

### First Deployment
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (~1-2 minutes)
- [ ] Check deployment logs for errors
- [ ] Verify deployment succeeded

## Post-Deployment Testing

### Functionality Testing
- [ ] Visit production URL
- [ ] Test ingredient input
- [ ] Test preference selection
- [ ] Generate a recipe (IMPORTANT: This uses real API credits)
- [ ] Save a recipe
- [ ] Reload page - verify saved recipe persists
- [ ] Test on mobile device
- [ ] Test on different browsers (Chrome, Safari, Firefox)

### Error Handling
- [ ] Test without API key (should show error)
- [ ] Test with invalid ingredients (should handle gracefully)
- [ ] Test network errors (disconnect internet briefly)
- [ ] Verify error messages are user-friendly

### Performance Testing
- [ ] Page loads in < 3 seconds
- [ ] Recipe generation completes in < 10 seconds
- [ ] No layout shifts during loading
- [ ] Animations are smooth
- [ ] Mobile performance is acceptable

## Monitoring

### OpenAI Usage
- [ ] Monitor API usage at [platform.openai.com/usage](https://platform.openai.com/usage)
- [ ] Set up usage alerts (optional)
- [ ] Track costs vs. budget
- [ ] Consider rate limiting if needed

### Vercel Analytics (Optional)
- [ ] Enable Vercel Analytics
- [ ] Monitor page views
- [ ] Track Web Vitals
- [ ] Review deployment frequency

### Error Monitoring (Optional)
- [ ] Set up Sentry or similar
- [ ] Configure error alerts
- [ ] Review error reports regularly

## Security

### API Keys
- [ ] ✅ `.env.local` in `.gitignore`
- [ ] ✅ No API keys in code
- [ ] ✅ Environment variables used correctly
- [ ] API key stored securely in Vercel

### Dependencies
- [ ] All dependencies up to date
- [ ] No known security vulnerabilities (`npm audit`)
- [ ] Trusted packages only

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured
- [ ] Domain added to Vercel project
- [ ] SSL certificate active (automatic with Vercel)

### Analytics
- [ ] Google Analytics added (optional)
- [ ] Cookie consent implemented (if in EU)
- [ ] Privacy policy added (if collecting data)

### SEO
- [ ] Meta tags added
- [ ] Open Graph tags for social sharing
- [ ] Favicon updated
- [ ] sitemap.xml generated

### Features
- [ ] Recipe sharing functionality
- [ ] User authentication (if planned)
- [ ] Database integration (if replacing localStorage)
- [ ] Additional AI features

## Rollback Plan

If deployment fails or issues are found:

1. [ ] Vercel allows instant rollback to previous deployment
2. [ ] Click "Rollback" in deployment dashboard
3. [ ] Investigate issues locally
4. [ ] Fix and redeploy

## Success Criteria

Your deployment is successful when:

- ✅ Production URL loads without errors
- ✅ Users can generate recipes
- ✅ Recipes can be saved and retrieved
- ✅ Mobile experience is smooth
- ✅ API costs are within budget
- ✅ No critical errors in logs

## Post-Launch

### Week 1
- [ ] Monitor error logs daily
- [ ] Track API usage
- [ ] Gather user feedback
- [ ] Fix critical bugs immediately

### Week 2-4
- [ ] Review usage patterns
- [ ] Optimize based on real data
- [ ] Consider feature additions
- [ ] Update documentation as needed

### Ongoing
- [ ] Keep dependencies updated
- [ ] Monitor OpenAI for new models
- [ ] Improve based on user feedback
- [ ] Consider monetization (if applicable)

## Common Issues & Solutions

### "OpenAI API key not configured"
**Solution**: Add `OPENAI_API_KEY` to Vercel environment variables and redeploy

### Build fails on Vercel
**Solution**: Check build logs, ensure all dependencies in package.json, verify Node.js version compatibility

### Recipe generation is slow
**Solution**: Normal for GPT-4 (5-10 seconds). Consider adding better loading feedback or using GPT-3.5-turbo for faster responses

### LocalStorage not working
**Solution**: Ensure browser allows localStorage, check for private/incognito mode

### Mobile sidebar not opening
**Solution**: Check z-index conflicts, verify Tailwind responsive classes

## Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Project README](./README.md)
- [Quick Start Guide](./QUICKSTART.md)

---

Good luck with your deployment! 🚀
