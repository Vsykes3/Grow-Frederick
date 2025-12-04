# Render Deployment Guide - Troubleshooting 502 Errors

## Common Causes of 502 Bad Gateway on Render

### 1. **Missing Environment Variables** ⚠️ CRITICAL

Make sure ALL these environment variables are set in your Render dashboard:

#### Required Variables:
```
DATABASE_URL=postgresql://...  (Your Render PostgreSQL database URL)
NEXTAUTH_URL=https://growcommon.garden  (Your actual domain)
NEXTAUTH_SECRET=your-random-secret-here  (Generate with: openssl rand -base64 32)
```

#### Optional but Recommended:
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
OWM_API_KEY=...
GOOGLE_MAPS_API_KEY=...
```

### 2. **Database Connection Issues**

- Ensure your PostgreSQL database is running on Render
- Check DATABASE_URL is correct
- Run migrations: Add this to build command or run manually
- Database might need to be in the same region

### 3. **Application Startup Failures**

Check Render logs:
1. Go to Render Dashboard → Your Service → Logs
2. Look for error messages at startup
3. Common errors:
   - Missing env vars
   - Database connection timeout
   - Prisma client not generated
   - Module not found errors

### 4. **Cold Start Timeout**

If your app takes > 75 seconds to start:
- Render free tier has 75s timeout
- Consider upgrading to paid plan
- Or optimize startup time

### 5. **Port Configuration**

✅ **Already Fixed**: Next.js automatically uses Render's PORT env var

## Quick Fixes

### Fix 1: Check Build Logs
```bash
# In Render Dashboard → Logs tab
# Look for build errors or missing dependencies
```

### Fix 2: Verify Environment Variables
1. Go to Render Dashboard
2. Select your service
3. Go to Environment tab
4. Verify all required variables are set

### Fix 3: Check Database
1. Ensure PostgreSQL service is running
2. Verify DATABASE_URL is correct
3. Test connection manually if possible

### Fix 4: Manual Deployment Steps

In Render Dashboard:
1. **Settings** → **Build Command**: 
   ```
   npm ci && npm run build && npx prisma generate
   ```

2. **Settings** → **Start Command**: 
   ```
   npm start
   ```

3. **Settings** → **Health Check Path**: 
   ```
   /
   ```

## Environment Variables Checklist

- [ ] DATABASE_URL (PostgreSQL connection string)
- [ ] NEXTAUTH_URL (https://growcommon.garden)
- [ ] NEXTAUTH_SECRET (random 32+ character string)
- [ ] GOOGLE_CLIENT_ID (if using Google auth)
- [ ] GOOGLE_CLIENT_SECRET (if using Google auth)
- [ ] STRIPE_SECRET_KEY (if using payments)
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (if using payments)
- [ ] OWM_API_KEY (for weather)
- [ ] GOOGLE_MAPS_API_KEY (for maps)

## Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use an online generator and copy the result to NEXTAUTH_SECRET.

## Debugging Steps

1. **Check Logs First**: Render Dashboard → Logs tab
2. **Verify Build Success**: Check if build completed
3. **Check Startup**: Look for "Ready" message
4. **Test Health Check**: Visit your domain's root path
5. **Check Database**: Verify PostgreSQL is running

## Still Not Working?

1. Check Render status page: https://status.render.com
2. Review Render documentation: https://render.com/docs
3. Check Next.js deployment docs: https://nextjs.org/docs/deployment

## Support

If issues persist:
- Check Render community forum
- Review application logs thoroughly
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility (18+)

