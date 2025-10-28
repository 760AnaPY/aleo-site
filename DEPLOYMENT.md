# Vercel Deployment Guide

## Prerequisites
- Node.js 22.x (as specified in package.json)
- Vercel account (https://vercel.com)
- GitHub repository with your project code

## Step 1: Environment Variables Setup

1. In your Vercel dashboard, go to your project settings
2. Navigate to "Environment Variables" section
3. Add the following environment variables (replace with your actual Firebase credentials):

```
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 2: Connect Your Repository

1. Click "Add New..." in Vercel dashboard
2. Select "Project"
3. Import your GitHub repository
4. Vercel will automatically detect your framework (Vite)

## Step 3: Deploy Configuration

Your project is already configured with:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install --no-optional`
- Framework: Vite

## Step 4: Deployment

1. Click "Deploy" button
2. Wait for the build process to complete
3. Your site will be live at a `.vercel.app` domain

## Step 5: Custom Domain (Optional)

1. Go to project settings
2. Navigate to "Domains" tab
3. Add your custom domain
4. Configure DNS records as instructed by Vercel

## Troubleshooting

### Build Issues
- Ensure Node.js version 22.x is specified in your environment
- Check that all dependencies are properly installed

### Environment Variables Issues
- Make sure all Firebase environment variables are set correctly
- Variables must start with `VITE_` prefix to be accessible in the browser

### Firebase Configuration
- Copy your Firebase configuration from Firebase Console
- Go to Project Settings → Your Apps → Web App → Config
- Update all environment variables with your actual values

## Performance Optimization

The build process shows a warning about large chunks (1MB+). To optimize:

1. Consider code splitting with dynamic imports
2. Add manual chunk configuration to vite.config.js if needed

## Automatic Deployments

- Every push to your main branch will trigger a new deployment
- Pull request previews are automatically generated
- You can configure custom deployment rules in project settings

## Monitoring

- Check Vercel Analytics for performance metrics
- Monitor build logs for any issues
- Set up error tracking with services like Sentry if needed