# Deployment Guide for MockBot

## Frontend Deployment (Vercel)

### 1. Environment Variables
In your Vercel project settings, add the following environment variable:

```
VITE_API_URL=https://mock-bot-kynz.onrender.com
```

### 2. Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Deployment Steps
1. Connect your GitHub repository to Vercel
2. Set the environment variable above
3. Deploy

## Backend Deployment (Render)

### 1. Environment Variables
In your Render service settings, add these environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=10000
```

### 2. Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3. Health Check
- **Health Check Path**: `/api/health`

## Important Notes

1. **CORS Configuration**: Make sure your backend allows requests from your Vercel domain
2. **Environment Variables**: Never commit sensitive data to your repository
3. **API URL**: The frontend will automatically use the production backend URL when `VITE_API_URL` is set

## Troubleshooting

### Frontend Issues
- Check that `VITE_API_URL` is set correctly in Vercel
- Verify the backend URL is accessible
- Check browser console for CORS errors

### Backend Issues
- Ensure all environment variables are set in Render
- Check Render logs for startup errors
- Verify MongoDB connection string is correct
