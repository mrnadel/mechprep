import { NextResponse } from 'next/server';

// Digital Asset Links for Android TWA (Trusted Web Activity)
// This verifies that the Android app is authorized to open octokeen.com in TWA mode.
// Replace the sha256_cert_fingerprints value with your actual signing key fingerprint.
// Generate it with: keytool -list -v -keystore your-keystore.jks | grep SHA256

export async function GET() {
  const assetLinks = [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: process.env.ANDROID_PACKAGE_NAME || 'com.octokeen.app',
        sha256_cert_fingerprints: [
          process.env.ANDROID_SHA256_FINGERPRINT || 'TODO:REPLACE_WITH_ACTUAL_FINGERPRINT',
        ],
      },
    },
  ];

  return NextResponse.json(assetLinks, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
