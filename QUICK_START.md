# SavvY BI Dashboard - PWA Quick Start Guide

## Installation (User Perspective)

### Android Devices
1. Open **Chrome** browser
2. Visit the website
3. Look for **"Install app"** banner (appears after 2 seconds)
4. Tap **"Install"** button
5. App appears on home screen
6. Tap icon to launch app

### iPhone/iPad
1. Open **Safari** browser
2. Visit the website
3. Tap **Share** button (⬆️ arrow)
4. Scroll down and tap **"Add to Home Screen"**
5. Confirm app name
6. App appears on home screen
7. Tap icon to launch app

### Computer
- **Chrome**: Menu > "Install app"
- **Edge**: Menu > "Install this site as an app"
- Works on Windows, Mac, Linux

## Features

✓ **Offline Access** - Works without internet
✓ **Fast Loading** - Instant from home screen
✓ **Native Feel** - No browser chrome
✓ **Home Screen** - Like a real app
✓ **Auto-Update** - Gets new versions automatically

## Troubleshooting

### App won't install
- Make sure you're on a mobile device
- Use Chrome (Android) or Safari (iOS)
- Wait 2 seconds after page loads
- Check browser console for errors

### Can't access offline
- Service worker needs to load first
- Visit app while online before using offline
- Check App Settings > Storage
- Try clearing cache and reinstalling

### Page not loading
- Check internet connection
- Wait for Service Worker to activate (first load)
- Try refreshing the page
- Clear app cache: Settings > App Info > Storage > Clear Cache

## Quick Access

Once installed, the app remembers:
- Dashboard you last viewed
- Your password (only while logged in)
- All cached content

## Update App

The app automatically checks for updates every 60 seconds. If there's a new version:
1. Page will refresh automatically
2. No manual update needed
3. Always have the latest features

## Clear Cache (Advanced)

If you need to clear all cached data:

**In Browser Console:**
```javascript
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

Then reinstall the app.

## File Locations

All files are in the same directory:
- `index.html` - Main app
- `manifest.json` - App metadata
- `sw.js` - Offline support
- `offline.html` - Offline page
- `icons/` - App icons

## Technical Details

- **Cache Name**: savvy-bi-v1
- **Display**: Standalone (full-screen)
- **Theme**: Dark blue (#1e3a5f)
- **Caching**: Cache-first with network fallback

## Contact Support

For issues with the PWA:
1. Check the console (DevTools)
2. Verify service worker is active
3. Check cache storage contents
4. Try clearing and reinstalling

---

**Status**: Ready for use
**Version**: 1.0
**Last Updated**: 2026-03-19
