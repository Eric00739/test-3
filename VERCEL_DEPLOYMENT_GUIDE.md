# Vercel Deployment Guide for RFQ Email Functionality

## 🎯 Problem Solved
Your RFQ email functionality wasn't working because:
- GitHub Pages only serves static files (no API routes)
- Next.js was configured for static export (`output: "export"`)
- Server-side Resend API calls couldn't execute

## ✅ Changes Made

### 1. Next.js Configuration Updated
- **File**: `next.config.ts`
- **Changes**: Removed `output: "export"` and related static configurations
- **Result**: Now supports serverless functions for API routes

### 2. Vercel Configuration Added
- **File**: `vercel.json`
- **Purpose**: Configures Vercel deployment with environment variables
- **Features**: API routes, Node.js runtime, environment variable mapping

### 3. GitHub Workflow Updated
- **File**: `.github/workflows/deploy.yml`
- **Changes**: Switched from GitHub Pages to Vercel deployment
- **Note**: You can also deploy directly from Vercel dashboard

### 4. Debug Logging Added
- **File**: `src/app/api/rfq/route.ts`
- **Purpose**: Comprehensive logging for troubleshooting
- **Features**: Environment variable checks, API call details, error tracking

## 🚀 Deployment Steps

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy Project**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings in Vercel
   - Add these environment variables:
     ```
     RESEND_API_KEY=re_RjhgoVNG_MEWnPVzzGu2rw6ABPcdVi1wk
     RESEND_FROM_EMAIL=morningdewtech@gmail.com
     RFQ_TO_EMAIL=eric@fastfunrc.com
     ```

### Option B: Deploy via GitHub Actions

1. **Create Vercel Personal Access Token**
   - Go to Vercel dashboard → Account Settings → Tokens
   - Create a new token
   - Add to GitHub repository secrets as `VERCEL_TOKEN`

2. **Link Repository to Vercel**
   - Import your GitHub repository in Vercel
   - Vercel will automatically configure the deployment

3. **Set Environment Variables**
   - Add the same environment variables to GitHub repository secrets
   - Vercel will automatically sync these during deployment

## 🧪 Testing Locally

1. **Create Local Environment File**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Test RFQ Form**
   - Open your site locally
   - Fill out and submit the RFQ form
   - Check browser console and server logs

4. **Check Email Delivery**
   - Monitor `eric@fastfunrc.com` for test emails
   - Check Vercel function logs for debugging

## 🔍 Debugging

### Check Server Logs
```bash
# Local development
npm run dev

# Vercel logs
vercel logs
```

### Common Issues
1. **Environment Variables Not Found**
   - Ensure all three variables are set in Vercel
   - Check variable names match exactly

2. **API Route Not Working**
   - Verify `next.config.ts` doesn't have `output: "export"`
   - Check that API routes are in `src/app/api/` directory

3. **Resend API Errors**
   - Verify API key is valid
   - Check sender email is verified in Resend
   - Ensure recipient email can receive emails

## 📋 Environment Variables Required

| Variable | Value | Purpose |
|----------|-------|---------|
| `RESEND_API_KEY` | `re_RjhgoVNG_MEWnPVzzGu2rw6ABPcdVi1wk` | Resend API authentication |
| `RESEND_FROM_EMAIL` | `morningdewtech@gmail.com` | Verified sender email |
| `RFQ_TO_EMAIL` | `eric@fastfunrc.com` | Recipient for RFQ submissions |

## 🎉 Expected Results

After deployment:
- ✅ RFQ form submissions will trigger emails
- ✅ Debug logs will appear in Vercel function logs
- ✅ Emails will be sent to `eric@fastfunrc.com`
- ✅ Fallback mechanisms will work if Resend fails

## 🆘 Support

If issues persist:
1. Check Vercel function logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test the Resend API directly using their documentation
4. Check that the sender email is verified in Resend dashboard