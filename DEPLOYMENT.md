# Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Environment Variables

Set these environment variables in your Vercel project settings:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Deploying

1. **Automatic Deployment (Recommended)**
   - Push to `main` branch
   - Vercel automatically builds and deploys

2. **Manual Deployment**
   ```bash
   npm run build
   vercel deploy --prod
   ```

### Configuration

The `vercel.json` file contains:
- **MIME type headers**: Ensures `.js`, `.css`, and `.wasm` files are served with correct Content-Type
- **Cache headers**: Sets optimal caching for immutable assets (1 year)
- **SPA routing**: Redirects all routes to `index.html` for client-side routing

### Production Build

```bash
npm run build
```

This creates a `dist/` directory ready for deployment.

## Common Issues

### Issue: "Failed to load module script" error

**Cause:** MIME type headers are incorrect (files served as `application/octet-stream`)

**Solution:**
- Ensure `vercel.json` has proper MIME type headers
- Clear Vercel cache and redeploy
- Check that files in `dist/assets/` are generated correctly

```bash
npm run build
vercel deploy --prod --force
```

### Issue: Assets not loading

**Solution:**
- Check that `base: '/'` in `vite.config.ts` matches your deployment URL
- Verify `vercel.json` routes are correct
- Clear browser cache (Ctrl+Shift+Del)

### Issue: Env variables not working

**Solution:**
- Add variables to Vercel project settings (not `.env.local`)
- Rebuild and redeploy
- Variables are only loaded from environment, not from code

## File Structure

```
dist/
├── index.html          # SPA entry point (no-cache)
├── assets/
│   ├── *.js           # JavaScript bundles (immutable, 1 year cache)
│   ├── *.css          # Stylesheets (immutable, 1 year cache)
│   └── *.wasm         # WebAssembly modules (immutable, 1 year cache)
└── public/
    └── *              # Static files
```

## Performance Tips

1. **Caching**: Static assets are cached for 1 year (immutable)
2. **Compression**: Vercel automatically compresses with gzip/brotli
3. **CDN**: All assets served through Vercel's global CDN
4. **Source Maps**: Enabled for production debugging (set `sourcemap: true` in `vite.config.ts`)

## Monitoring

### Check Deployment Status
```bash
vercel ls
```

### View Recent Deployments
- Go to your Vercel project dashboard
- Check "Deployments" tab

### Check Logs
```bash
vercel logs
```

## Troubleshooting

### Full redeploy (if something is cached)
```bash
vercel deploy --prod --force
```

### Clear Vercel cache
```bash
vercel env pull          # Get latest env vars
npm run build             # Rebuild locally
vercel deploy --prod     # Deploy fresh build
```

### Test production build locally
```bash
npm run build
npm run preview
```

Then open `http://localhost:5173`

## Security Headers

Vercel's default security headers include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

These are automatically applied and cannot be overridden in `vercel.json`.

## Database & External Services

Currently uses email service (see `.env` configuration). For adding databases or APIs:

1. Add environment variables to Vercel
2. Use backend API endpoints in `src/pages/api/`
3. Vercel automatically deploys serverless functions

## Support

For Vercel-specific issues, visit: https://vercel.com/docs
