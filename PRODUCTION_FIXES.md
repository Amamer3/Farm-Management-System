# Production 401 Errors - Fixes Applied

## Problem
Getting `401 (Unauthorized)` errors in production while everything works in development.

## Root Causes Identified

1. **CORS Configuration**: Production requests are cross-origin and need proper CORS headers
2. **API Base URL**: The API base URL might not be correctly configured in production
3. **Fetch Configuration**: Missing CORS mode and credentials settings

## Fixes Applied

### 1. CORS Configuration (`src/services/authService.ts` & `src/services/dataService.ts`)

Added proper CORS settings to all fetch requests:

```typescript
const config: RequestInit = {
  ...options,
  headers,
  mode: 'cors',
  credentials: 'omit', // For cross-origin requests
  // For same-origin requests, uses 'same-origin'
}
```

### 2. API Base URL Normalization

Created a helper function to ensure the API base URL is always correct:

```typescript
function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL
  if (envUrl) {
    // If it's a full URL, ensure it ends with /api
    if (envUrl.startsWith('http')) {
      return envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/$/, '')}/api`
    }
    return envUrl
  }
  // Fallback for production
  return import.meta.env.PROD ? 'https://farm-management-server.onrender.com/api' : '/api'
}
```

This ensures:
- If `VITE_API_BASE_URL` is set to `https://farm-management-server.onrender.com`, it automatically becomes `https://farm-management-server.onrender.com/api`
- If it's already `https://farm-management-server.onrender.com/api`, it stays as-is
- Falls back to the correct production URL if not set

### 3. Enhanced Error Logging

Added production error logging to help debug issues:

```typescript
if (import.meta.env.PROD) {
  console.error('[API Error]', {
    url,
    status: response.status,
    statusText: response.statusText,
    endpoint,
    errorData,
    apiBaseUrl: API_BASE_URL
  })
}
```

## Required Actions

### 1. Set Environment Variable in Production

Make sure your production build has the `VITE_API_BASE_URL` environment variable set:

**For Vercel:**
- Go to Project Settings → Environment Variables
- Add: `VITE_API_BASE_URL` = `https://farm-management-server.onrender.com/api`

**For Netlify:**
- Go to Site Settings → Environment Variables
- Add: `VITE_API_BASE_URL` = `https://farm-management-server.onrender.com/api`

**For GitHub Pages or other static hosts:**
- Set the environment variable before building:
  ```bash
  export VITE_API_BASE_URL=https://farm-management-server.onrender.com/api
  npm run build
  ```

### 2. Verify Backend CORS Configuration

Ensure your backend API (`farm-management-server.onrender.com`) has CORS configured to allow requests from your frontend domain:

```javascript
// Example Express.js CORS configuration
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:5173'],
  credentials: false, // Set to true if you need cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

### 3. Rebuild and Redeploy

After setting the environment variable:

1. **Rebuild the application:**
   ```bash
   npm run build
   ```

2. **Redeploy** to your hosting platform

3. **Verify** the environment variable is included in the build by checking the browser console for the API base URL in error logs

## Testing

After deployment, check the browser console:

1. **Verify API Base URL**: Look for `[API Error]` logs to see what `apiBaseUrl` is being used
2. **Check Request URLs**: Verify requests are going to `https://farm-management-server.onrender.com/api/auth/login` (with `/api`)
3. **Check CORS Headers**: In Network tab, verify the request has `mode: cors` and proper headers

## Common Issues

### Issue: Still getting 401 errors

**Possible causes:**
1. Environment variable not set correctly in production
2. Backend CORS not configured for your frontend domain
3. Backend authentication endpoint path is different
4. Backend requires different headers

**Solution:**
- Check browser console for `[API Error]` logs
- Verify the `apiBaseUrl` in the logs
- Check Network tab to see the actual request URL and headers
- Verify backend CORS configuration includes your frontend domain

### Issue: CORS errors instead of 401

**Possible causes:**
1. Backend CORS not configured
2. Backend doesn't allow your frontend origin

**Solution:**
- Update backend CORS configuration to include your frontend domain
- Check backend logs for CORS-related errors

## Additional Notes

- The code now automatically appends `/api` to full URLs if missing
- All fetch requests now include `mode: 'cors'` and `credentials: 'omit'`
- Production error logging will help identify issues
- The fallback URL is set to `https://farm-management-server.onrender.com/api` for production builds

