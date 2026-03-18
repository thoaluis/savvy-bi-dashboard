# SavvY BI Dashboard - PWA (Progressive Web App) Setup

## Overview
This website has been converted into a fully installable Progressive Web App (PWA) that works on both iOS and Android, with offline support and native app-like experience.

## Files Created

### 1. **manifest.json** - PWA Manifest
- Defines the app metadata and installation behavior
- Specifies app name, description, icons, and display mode
- Standalone display mode (hides browser chrome)
- Dark blue theme colors (#1e3a5f)
- Includes app shortcuts for quick access to specific dashboards
- Supports both standard and maskable icon purposes

### 2. **sw.js** - Service Worker
- Implements offline functionality with cache-first strategy
- Caches all HTML pages on first load:
  - index.html
  - sales-2025.html
  - hr-dashboard.html
  - tong-hop-2025-2026.html
  - Chart.js CDN library
- Cache name: `savvy-bi-v1`
- Serves cached content when offline
- Falls back to network when cache miss occurs
- Automatically updates cache when online
- Handles cache cleanup on service worker updates

### 3. **offline.html** - Offline Fallback Page
- Beautiful offline page that matches app styling
- Shows connection status with real-time checking
- Provides helpful tips for reconnecting
- Auto-redirects when connection is restored
- Responsive design for mobile and desktop

### 4. **icons/ Directory** - App Icons
- **icon-192.png** (192x192): Home screen icon for Android
- **icon-512.png** (512x512): App store icon and high-res displays
- **apple-touch-icon.png** (180x180): iOS home screen icon
- All icons feature dark blue (#1e3a5f) background with white "BI" text
- PNG format for maximum compatibility

### 5. **Updated index.html**
Enhanced with PWA support:
- Meta tags for PWA installation
- Apple-specific meta tags for iOS support
- Manifest file reference
- Apple touch icon reference
- Icon references for all devices
- PWA install banner (shows on mobile when not installed)
- Service worker registration script
- Automatic update checking (every 60 seconds)
- Install prompt handling with user-friendly UI

## Features

### iOS Installation
1. Open Safari and navigate to the website
2. Tap the Share button
3. Select "Add to Home Screen"
4. Choose app name and add
5. Access app from home screen like a native app

### Android Installation
1. Open Chrome and navigate to the website
2. Wait for the "Install app" banner (appears after 2 seconds)
3. Click "Install" button or use menu > "Install app"
4. App appears on home screen as a native app
5. Alternatively, tap menu > "Create shortcut" or "Install app"

### Key PWA Benefits
- **Offline Support**: Full functionality when offline using cached content
- **Standalone Mode**: Runs without browser chrome (looks like native app)
- **Add to Home Screen**: Direct access from mobile home screens
- **Fast Loading**: Cached assets load instantly from local storage
- **Secure**: HTTPS required (recommended for production)
- **Push Notifications**: Can be added in future updates
- **Responsive**: Works on phones, tablets, and desktops

## Browser Compatibility

### Android
- Chrome 36+
- Edge (Chromium)
- Samsung Internet 4+
- Firefox (partial support)
- Opera

### iOS
- Safari 11.3+ (limited PWA support)
- Can be added to home screen
- Launches in standalone mode
- Runs in WebKit engine

### Desktop
- Chrome 31+
- Edge (Chromium)
- Firefox 55+
- Opera

## Service Worker Lifecycle

1. **Install**: Service worker downloads and caches assets
2. **Activate**: Old caches are cleaned up
3. **Fetch**: Intercepts requests with cache-first strategy
4. **Update**: Checks for updates every 60 seconds, automatically reloads if new version detected

## Caching Strategy

- **Cache-First**: Used for all local assets
  - Serves from cache immediately
  - Updates cache in background
  - Falls back to network if not cached
  
- **Network-First**: Used for CDN resources
  - Tries network first
  - Falls back to cache if offline
  - Stores successful responses for future use

## Configuration Details

### Manifest.json
```json
{
  "name": "SavvY BI Dashboard",
  "short_name": "SavvY BI",
  "description": "Business Intelligence Dashboard cho dự án SavvY Go",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#1e3a5f",
  "orientation": "any"
}
```

### Cache Configuration (Service Worker)
- Cache Name: `savvy-bi-v1`
- Cached Assets: 4 HTML pages + Chart.js library
- Strategy: Cache first with network fallback
- Auto-cleanup: Old caches deleted on activation

## Testing

### Test Offline Functionality
1. Open DevTools (F12)
2. Go to Application > Service Workers
3. Check "Offline" checkbox
4. Navigate between pages
5. All cached content should load instantly

### Test Installation
- **Chrome/Android**: Look for install banner
- **Safari/iOS**: Use "Add to Home Screen" from Share menu

### Clear Cache
```javascript
// Run in console to clear all caches
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

## Production Deployment

For production deployment:

1. **HTTPS Required**: PWAs require HTTPS
   - Install SSL certificate on your server
   - Redirect HTTP to HTTPS

2. **Service Worker Location**: Keep sw.js in root directory
   - It controls the entire `/` scope
   - Can be moved to subdirectory with manifest adjustment

3. **Icon Optimization**: Current icons are uncompressed
   - Can further optimize for production
   - Ensure icons are always served quickly

4. **Cache Versioning**: Update CACHE_NAME when deploying
   ```javascript
   const CACHE_NAME = 'savvy-bi-v2'; // Increment version
   ```

5. **Monitor Service Worker**:
   - Check browser console for registration messages
   - Monitor cache hit rates
   - Track offline usage patterns

## Future Enhancements

Potential additions to improve the PWA:

1. **Push Notifications**
2. **Background Sync**: Sync data when back online
3. **Share Target**: Share to app from other apps
4. **File Handling**: Open files with the app
5. **Periodic Background Sync**: Regular data updates
6. **Payment API**: In-app payments
7. **Wake Lock API**: Keep screen on during data entry
8. **Vibration API**: Haptic feedback on actions

## Troubleshooting

### App won't install
- Ensure HTTPS is enabled (if on production)
- Wait 2 seconds after page load (banner delay)
- Check browser console for service worker errors

### Offline page shows but should work
- Check service worker registration in DevTools
- Clear cache: Settings > App Info > Storage > Clear Cache
- Reinstall the app

### Pages not loading offline
- Service worker must complete installation
- All cached pages must be accessible
- Check sw.js in Application > Service Workers

### iOS specific issues
- Cookies and cache cleared on app exit
- Limited background sync capabilities
- No push notifications support yet

## File Locations

```
/sessions/dazzling-brave-clarke/mnt/outputs/bi-savvygo/
├── index.html                 # Main app shell (updated)
├── sales-2025.html           # Sales dashboard
├── hr-dashboard.html         # HR dashboard
├── tong-hop-2025-2026.html   # Combined overview
├── manifest.json             # PWA manifest
├── sw.js                      # Service worker
├── offline.html              # Offline fallback page
├── PWA_SETUP.md             # This file
└── icons/
    ├── icon-192.png          # Android home screen icon
    ├── icon-512.png          # App store icon
    └── apple-touch-icon.png  # iOS home screen icon
```

## Support

For PWA support and updates:
- Check browser console for service worker messages
- Use Chrome DevTools Application tab for debugging
- Monitor service worker status and cache contents
- Review service worker error logs

---

Generated: 2026-03-19
Version: 1.0
