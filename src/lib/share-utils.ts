export type ShareResult = 'shared' | 'copied' | 'downloaded' | 'cancelled';

/**
 * Share an image using the best available method:
 * 1. Web Share API with file (mobile)
 * 2. Web Share text-only (desktop)
 * 3. Download file (final fallback)
 */
export async function shareImage(
  imageUrl: string,
  shareText: string,
  fileName: string,
): Promise<ShareResult> {
  try {
    // Try Web Share API with file support (mobile browsers)
    if (navigator.canShare) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          text: shareText,
          files: [file],
        });
        return 'shared';
      }
    }

    // Fallback: Web Share API text-only (desktop)
    if (navigator.share) {
      await navigator.share({
        text: shareText,
        url: imageUrl,
      });
      return 'shared';
    }
  } catch (err) {
    // User cancelled the share dialog
    if (err instanceof Error && err.name === 'AbortError') {
      return 'cancelled';
    }
  }

  // Final fallback: download the file
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return 'downloaded';
  } catch {
    return 'cancelled';
  }
}
