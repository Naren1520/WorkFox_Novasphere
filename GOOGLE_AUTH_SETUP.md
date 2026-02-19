# Google OAuth Setup Guide for WorkFox

Follow these steps to set up Google Authentication for your WorkFox application.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: `WorkFox` (or your preferred name)
5. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" (unless you have a Google Workspace)
3. Click "Create"
4. Fill in the required information:
   - **App name**: WorkFox
   - **User support email**: Your email
   - **App logo**: Upload your logo (optional)
   - **Application home page**: Your app URL (e.g., `http://localhost:5173` for development)
   - **Authorized domains**: Add your domain (for production)
   - **Developer contact information**: Your email
5. Click "Save and Continue"
6. On "Scopes" page, click "Add or Remove Scopes"
   - Add: `email`, `profile`, `openid`
7. Click "Save and Continue"
8. Add test users (your email) if in testing mode
9. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Fill in the details:
   - **Name**: WorkFox Web Client
   - **Authorized JavaScript origins**:
     - For development: `http://localhost:5173`
     - For production: `https://yourdomain.com`
   - **Authorized redirect URIs**:
     - For development: `http://localhost:5173`
     - For production: `https://yourdomain.com`
5. Click "Create"
6. Copy the **Client ID** (you'll need this!)

## Step 5: Configure Your Application

1. Open your `.env` file in the project root
2. Add your Google Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
   ```
3. Save the file

## Step 6: Test the Authentication

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Open your browser and go to `http://localhost:5173`
3. You should see the loading screen, then the login page
4. Click "Sign in with Google"
5. Select your Google account
6. Grant permissions
7. You should be redirected to the landing page

## Important URLs for Google Cloud Console

### For Development:
- **Authorized JavaScript origins**: `http://localhost:5173`
- **Authorized redirect URIs**: `http://localhost:5173`

### For Production (Netlify):
- **Authorized JavaScript origins**: `https://your-app-name.netlify.app`
- **Authorized redirect URIs**: `https://your-app-name.netlify.app`

### For Production (Vercel):
- **Authorized JavaScript origins**: `https://your-app-name.vercel.app`
- **Authorized redirect URIs**: `https://your-app-name.vercel.app`

### For Production (Custom Domain):
- **Authorized JavaScript origins**: `https://yourdomain.com`
- **Authorized redirect URIs**: `https://yourdomain.com`

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the URL in your browser matches exactly with the authorized redirect URIs
- Check for trailing slashes
- Ensure you're using the correct protocol (http vs https)

### Error: "invalid_client"
- Double-check your Client ID in the .env file
- Make sure there are no extra spaces or quotes

### Error: "access_denied"
- Check if your app is in testing mode and you're using a test user email
- Verify the OAuth consent screen is properly configured

## Security Notes

1. **Never commit your .env file** - It's already in .gitignore
2. **Use environment variables** for production deployments
3. **Restrict your API keys** in Google Cloud Console
4. **Enable only necessary scopes** (email, profile, openid)

## Production Deployment

When deploying to production:

1. Add your production URL to Google Cloud Console:
   - Go to "Credentials" > Your OAuth Client
   - Add production URLs to authorized origins and redirect URIs
   
2. Set environment variables in your hosting platform:
   - Netlify: Site settings > Environment variables
   - Vercel: Project settings > Environment Variables
   - Add: `VITE_GOOGLE_CLIENT_ID=your_client_id`

3. Redeploy your application

## Support

If you encounter issues:
- Check the browser console for errors
- Verify all URLs match exactly
- Ensure the OAuth consent screen is published (not in draft)
- Make sure you're using a test user if in testing mode
