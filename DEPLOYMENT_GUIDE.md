# Deployment Guide - Baku Shop

Complete step-by-step guide to deploy your SEO-first e-commerce site to production.

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Sanity.io account (free tier)
- WhatsApp Business number (or personal WhatsApp)

## Step 1: Setup Sanity.io (5 minutes)

### Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io) and sign up
2. Click "Create new project"
3. Choose a project name (e.g., "Baku Shop")
4. Choose "Production" dataset
5. Copy your **Project ID** (you'll need this)

### Configure CORS

1. Go to your Sanity project dashboard
2. Navigate to **API** → **CORS Origins**
3. Add these origins:
   - `http://localhost:3000` (for local development)
   - `https://your-domain.vercel.app` (your production domain)
   - `https://*.vercel.app` (for preview deployments)

## Step 2: Deploy to Vercel (3 minutes)

### Connect GitHub Repository

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository

### Configure Environment Variables

Add these in Vercel project settings:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=994000000
```

**Important**: Replace values with your actual configuration!

### Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your site is now live!

## Step 3: Access Sanity Studio (1 minute)

1. Go to `https://your-domain.vercel.app/studio`
2. Sign in with your Sanity credentials
3. You now have access to your CMS

## Step 4: Add Your First Product (5 minutes)

1. In Sanity Studio, click "Product"
2. Fill in the form:
   - **Title**: iPhone 13 Pro
   - **Slug**: Click "Generate" (creates: iphone-13-pro)
   - **Price**: 1499 (in AZN)
   - **Description**: Add rich text description
   - **Main Image**: Upload product image and add alt text
   - **Gallery**: Upload 2-3 more images (optional)
   - **Availability**: Select "In Stock"
   - **Category**: Select "Electronics"
   - **Meta Title**: iPhone 13 Pro - Buy Online in Baku (optional)
   - **Meta Description**: Buy iPhone 13 Pro in Baku, Azerbaijan. Fast delivery... (recommended)
3. Click "Publish"

## Step 5: Test Your Site (3 minutes)

### Homepage
- Go to your live site
- You should see your product listed

### Product Page
- Click on the product card
- Verify all images, text, and price display correctly
- Check breadcrumbs and navigation

### WhatsApp Integration
- Click "Order via WhatsApp" button
- Should open WhatsApp with pre-filled message
- Verify the number is correct

### Shopping Cart
- Click "Add to Cart" on a product
- Open cart from header icon
- Adjust quantity
- Click "Order via WhatsApp" from cart

### Contact Page
- Go to `/contact`
- Click "Chat on WhatsApp"
- Verify contact information

## Step 6: SEO Verification (5 minutes)

### Test Sitemap
Visit: `https://your-domain.vercel.app/sitemap.xml`
- Should list all pages and products

### Test Robots.txt
Visit: `https://your-domain.vercel.app/robots.txt`
- Should allow all pages except /studio and /api

### Test Meta Tags
1. Right-click any page → "View Page Source"
2. Look for:
   - `<title>` tag
   - `<meta name="description">` tag
   - `<meta property="og:title">` tags
   - `<script type="application/ld+json">` (structured data)

### Test Google Search Console (Optional)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership
4. Submit sitemap: `https://your-domain.vercel.app/sitemap.xml`

## Step 7: Performance Testing

### PageSpeed Insights
1. Go to [PageSpeed Insights](https://pagespeed.web.dev)
2. Enter your site URL
3. Check scores (should be 90+ for most metrics)

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Custom Domain Setup (Optional)

### Add Custom Domain in Vercel

1. Go to your Vercel project
2. Navigate to "Settings" → "Domains"
3. Add your domain (e.g., `bakushop.az`)
4. Follow DNS configuration instructions

### Update Environment Variables

Update `NEXT_PUBLIC_SITE_URL` to your custom domain:
```env
NEXT_PUBLIC_SITE_URL=https://bakushop.az
```

Redeploy for changes to take effect.

## Ongoing Maintenance

### Adding Products
- Access `/studio` anytime
- Add/edit products
- Changes appear within 1 hour (ISR revalidation)

### Force Immediate Update
```bash
# Trigger redeployment
vercel --prod
```

### Monitor Analytics
- Check Vercel Analytics dashboard
- Track page views, performance, and user behavior

## Troubleshooting

### Products Not Showing
1. Check Sanity Studio - are products published?
2. Check environment variables in Vercel
3. Check Vercel deployment logs for errors

### Images Not Loading
1. Verify CORS settings in Sanity
2. Check image URLs in Network tab
3. Verify `next.config.mjs` has correct image domains

### WhatsApp Not Working
1. Verify `NEXT_PUBLIC_WHATSAPP_NUMBER` format (994501234567)
2. Test WhatsApp URL manually
3. Check console for JavaScript errors

### SEO Issues
1. Verify `NEXT_PUBLIC_SITE_URL` is set correctly
2. Check sitemap.xml is accessible
3. Use Google's Rich Results Test for structured data

## Security Checklist

- [x] Sanity Studio protected by authentication
- [x] Environment variables set correctly
- [x] CORS configured properly
- [x] No API keys exposed in client code
- [x] robots.txt blocks /studio and /api

## Performance Checklist

- [x] Next.js Image optimization enabled
- [x] ISR configured (1-hour revalidation)
- [x] Static generation for all pages
- [x] Compression enabled
- [x] WebP/AVIF image formats

## Cost Breakdown (All Free Tier)

| Service | Cost | Limits |
|---------|------|--------|
| Vercel | Free | 100GB bandwidth/month |
| Sanity | Free | 10GB assets, 100k API requests/day |
| Domain (optional) | $10-15/year | N/A |

**Total Monthly Cost**: $0 (or ~$1/month with domain)

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## Need Help?

Open an issue on GitHub or contact via WhatsApp!
