# SEO-First E-Commerce Website - Baku Shop

A production-ready, SEO-optimized e-commerce website built with Next.js App Router and Sanity.io, designed for zero-cost deployment with maximum search engine visibility.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity.io (Headless CMS)
- **Deployment**: Vercel (Free tier)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Rendering**: SSG + ISR (Incremental Static Regeneration)
- **State Management**: React hooks + localStorage

## Features

### SEO Optimization
- ✅ Full HTML rendering at build time (SSG)
- ✅ Per-page unique metadata (title, description, OG tags)
- ✅ Product structured data (schema.org JSON-LD)
- ✅ Automatic sitemap.xml generation
- ✅ robots.txt configuration
- ✅ SEO-friendly URLs (/products/product-name)
- ✅ Image optimization with Next.js Image
- ✅ Local SEO for Baku, Azerbaijan
- ✅ ISR for fresh content without redeployment

### E-Commerce Features
- Product listing with filtering
- Product detail pages with image galleries
- Shopping cart (localStorage)
- WhatsApp ordering integration
- Stock availability tracking
- Category organization

## Project Structure

```
├── app/
│   ├── page.tsx                  # Homepage (product listing)
│   ├── products/[slug]/page.tsx  # Product detail pages
│   ├── contact/page.tsx          # Contact page
│   ├── studio/[[...tool]]/       # Sanity Studio
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── robots.ts                 # Robots.txt
│   └── layout.tsx                # Root layout
├── components/
│   ├── product-card.tsx          # Product card component
│   ├── cart-button.tsx           # Cart with slide-out panel
│   ├── cart-item.tsx             # Individual cart item
│   ├── image-gallery.tsx         # Product image gallery
│   ├── add-to-cart-button.tsx    # Add to cart functionality
│   └── ui/                       # shadcn/ui components
├── sanity/
│   ├── schema.ts                 # Product schema definition
│   ├── client.ts                 # Sanity client config
│   └── queries.ts                # GROQ queries
├── lib/
│   ├── sanity-utils.ts           # Sanity helper functions
│   └── portable-text.tsx         # Rich text renderer
└── sanity.config.ts              # Sanity Studio config
```

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd baku-shop
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=994501234567
```

### 3. Setup Sanity.io

1. Create a free Sanity account at [sanity.io](https://www.sanity.io)
2. Create a new project
3. Copy your Project ID and add it to `.env.local`
4. Deploy the Sanity Studio:

```bash
npm run build
# Access the studio at http://localhost:3000/studio
```

### 4. Add Products

1. Go to `/studio` in your browser
2. Click "Product" to create a new product
3. Fill in all required fields:
   - Title
   - Slug (auto-generated)
   - Price (in AZN)
   - Description
   - Main Image (with alt text)
   - Gallery Images (optional)
   - Availability (In Stock / Out of Stock)
   - Category (optional)
   - SEO Meta Title (optional, defaults to product title)
   - SEO Meta Description (recommended)

### 5. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy. Make sure to add all environment variables in the Vercel dashboard.

## Sanity Product Schema

```typescript
{
  title: string                    // Product name
  slug: slug                       // Auto-generated URL-friendly slug
  price: number                    // Price in AZN
  description: portableText        // Rich text description
  mainImage: image                 // Main product image with alt text
  gallery: array<image>            // Additional product images
  availability: 'inStock' | 'outOfStock'
  category: string                 // Product category
  metaTitle: string                // SEO meta title (optional)
  metaDescription: text            // SEO meta description (optional)
}
```

## GROQ Query Examples

### Get All Products
```typescript
*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  price,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  availability,
  category
}
```

### Get Single Product
```typescript
*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  price,
  description,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  "galleryImages": gallery[]{"url": asset->url, alt},
  availability,
  metaTitle,
  metaDescription
}
```

## ISR Configuration

Products are revalidated every hour (3600 seconds):

```typescript
export const revalidate = 3600 // ISR: Revalidate every hour
```

This ensures:
- Fast page loads (pre-rendered at build time)
- Fresh content (auto-updates every hour)
- No need for full redeployment

## WhatsApp Integration

The site uses WhatsApp Web API for orders:

### Single Product Order
```typescript
const whatsappMessage = encodeURIComponent(
  `Hello! I'm interested in: ${product.title}
  Price: ${product.price} AZN
  Link: ${siteUrl}/products/${slug}`
)
const whatsappUrl = `https://wa.me/${number}?text=${whatsappMessage}`
```

### Cart Order
```typescript
const orderMessage = cart
  .map(item => `${item.title} x${item.quantity} - ${item.price * item.quantity} AZN`)
  .join('\n')
const whatsappMessage = encodeURIComponent(
  `Hello! I want to order:\n\n${orderMessage}\n\nTotal: ${totalPrice} AZN`
)
```

## SEO Checklist

### ✅ Technical SEO
- [x] SSG for all pages (full HTML at build time)
- [x] ISR enabled (3600s revalidation)
- [x] Dynamic sitemap.xml with all products
- [x] robots.txt configured
- [x] Meta tags on every page (title, description)
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] Canonical URLs set
- [x] Image optimization with Next.js Image
- [x] Alt text for all images
- [x] Semantic HTML (header, main, footer, nav)

### ✅ Structured Data
- [x] Product schema (JSON-LD) on product pages
- [x] LocalBusiness schema on contact page
- [x] Organization schema in root layout

### ✅ Performance
- [x] Next.js Image optimization
- [x] Lazy loading images
- [x] Optimized Core Web Vitals
- [x] Static generation for fast loading

### ✅ Local SEO
- [x] "Baku" and "Azerbaijan" in key content
- [x] LocalBusiness structured data
- [x] Location-specific metadata

## Performance Optimization

- **Images**: Next.js Image component with automatic optimization
- **Fonts**: Self-hosted Geist fonts with `font-display: swap`
- **CSS**: Tailwind CSS v4 with optimized output
- **JS**: Tree-shaking and code splitting by default
- **Caching**: ISR with 1-hour revalidation

## Maintenance

### Update Products
Add/edit products in the Sanity Studio at `/studio`. Changes will appear on the site within 1 hour (ISR revalidation period) or after a manual redeployment.

### Force Revalidation
To immediately update all pages:
```bash
vercel --prod
```

## License

MIT

## Support

For questions or issues, contact via WhatsApp or open an issue on GitHub.
```

```json file="" isHidden
