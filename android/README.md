# Octokeen Android App (TWA)

Wraps octokeen.com as a native Android app using Trusted Web Activity (TWA) via Bubblewrap.

## Prerequisites

None. Bubblewrap will auto-download JDK 17 and Android SDK on first run.

## Setup (one-time)

### 1. Initialize the project

```bash
cd android
npx @bubblewrap/cli init --manifest https://octokeen.com/manifest.json
```

This will:
- Ask to download JDK 17 (say **Yes**)
- Ask to download Android SDK (say **Yes**)
- Read the web manifest and ask you to confirm values
- Generate a signing keystore (remember the password!)

Accept the default values from the manifest. Override these if asked:
- Package name: `com.octokeen.app`
- Signing key alias: `octokeen`
- App version: `1`

### 2. Save your keystore password

The keystore (`android.keystore`) and its password are permanent. Losing either means you cannot update the app on Play Store. Store the password securely.

### 3. Get the signing fingerprint

```bash
keytool -list -v -keystore android.keystore | grep SHA256
```

### 4. Set up Digital Asset Links

Add the SHA-256 fingerprint as an environment variable on your deployment:
```
ANDROID_SHA256_FINGERPRINT=XX:XX:XX:...
ANDROID_PACKAGE_NAME=com.octokeen.app
```

Or edit `src/app/.well-known/assetlinks.json/route.ts` directly.

## Build

```bash
cd android
npx @bubblewrap/cli build
```

This produces:
- `app-release-bundle.aab` (for Play Store upload)
- `app-release-signed.apk` (for direct install/testing)

## Test locally

Install the APK on a connected device:
```bash
adb install app-release-signed.apk
```

Or drag the APK to an Android emulator.

## Play Store submission

1. Go to https://play.google.com/console
2. Create a new app
3. Upload the `.aab` file
4. Fill in:
   - App name: Octokeen
   - Short description: Master professional interviews with gamified practice
   - Full description: (see below)
   - Screenshots: phone (2+), 7-inch tablet (1+), 10-inch tablet (1+)
   - Feature graphic: 1024x500 banner
   - App icon: 512x512 (already have this)
   - Privacy policy URL: https://octokeen.com/privacy
   - Category: Education
   - Content rating: complete the questionnaire
5. Submit for review

## Version updates

Edit `twa-manifest.json`:
- Bump `appVersionCode` (integer, must always increase)
- Bump `appVersionName` (display string, e.g., "1.1.0")

Then rebuild:
```bash
npx @bubblewrap/cli update
npx @bubblewrap/cli build
```

Upload the new `.aab` to Play Console.
