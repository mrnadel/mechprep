'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useDevImageStore } from '@/store/useDevImageStore';

/**
 * Resize an image blob to max `maxW` px wide, output as WebP.
 * Falls back to PNG if WebP canvas export isn't supported.
 */
function resizeImage(blob: Blob, maxW = 1200): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w > maxW) {
        h = Math.round(h * (maxW / w));
        w = maxW;
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (result) => {
          if (result) resolve(result);
          else {
            // WebP not supported, fall back to PNG
            canvas.toBlob(
              (png) => (png ? resolve(png) : reject(new Error('Canvas export failed'))),
              'image/png',
            );
          }
        },
        'image/webp',
        0.85,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

async function uploadImage(unitId: string, blob: Blob): Promise<string> {
  const resized = await resizeImage(blob);
  const form = new FormData();
  form.append('unitId', unitId);
  form.append('file', resized);
  const res = await fetch('/api/dev/unit-header-image', { method: 'POST', body: form });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  const { url } = await res.json();
  return url as string;
}

async function deleteImage(unitId: string): Promise<void> {
  const res = await fetch('/api/dev/unit-header-image', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ unitId }),
  });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
}

interface DebugHeaderImageProps {
  unitId: string;
}

export function DebugHeaderImage({ unitId }: DebugHeaderImageProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const override = useDevImageStore((s) => s.overrides[unitId]);
  const setOverride = useDevImageStore((s) => s.setOverride);
  const removeOverride = useDevImageStore((s) => s.removeOverride);

  // Close popover on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleUpload = useCallback(
    async (blob: Blob) => {
      setBusy(true);
      setError(null);
      try {
        const url = await uploadImage(unitId, blob);
        setOverride(unitId, url);
        setOpen(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setBusy(false);
      }
    },
    [unitId, setOverride],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(file);
      // Reset so the same file can be re-selected
      e.target.value = '';
    },
    [handleUpload],
  );

  const handlePaste = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const items = await navigator.clipboard.read();
      let imageBlob: Blob | null = null;
      for (const item of items) {
        const imageType = item.types.find((t) => t.startsWith('image/'));
        if (imageType) {
          imageBlob = await item.getType(imageType);
          break;
        }
      }
      if (!imageBlob) {
        setError('No image in clipboard');
        setBusy(false);
        return;
      }
      const url = await uploadImage(unitId, imageBlob);
      setOverride(unitId, url);
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Paste failed');
    } finally {
      setBusy(false);
    }
  }, [unitId, setOverride]);

  const handleDelete = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      await deleteImage(unitId);
      removeOverride(unitId);
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  }, [unitId, removeOverride]);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
      }}
    >
      {/* Trigger button */}
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            setOpen((v) => !v);
          }
        }}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          border: '2px dashed rgba(255,255,255,0.6)',
          background: override ? 'rgba(34,197,94,0.7)' : 'rgba(0,0,0,0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          transition: 'background 0.2s',
        }}
        title={override ? 'Change/delete header image' : 'Set header image'}
      >
        {/* Camera icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>

      {/* Popover */}
      {open && (
        <div
          ref={popRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: 38,
            right: 0,
            background: '#1E1E2E',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: 8,
            minWidth: 180,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <PopButton
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            icon="📁"
            label={override ? 'Change Image' : 'Upload Image'}
          />
          <PopButton
            disabled={busy}
            onClick={handlePaste}
            icon="📋"
            label="Paste from Clipboard"
          />
          {override && (
            <PopButton
              disabled={busy}
              onClick={handleDelete}
              icon="🗑️"
              label="Delete Image"
              danger
            />
          )}
          {error && (
            <div style={{ fontSize: 11, color: '#F87171', padding: '4px 8px' }}>
              {error}
            </div>
          )}
          {busy && (
            <div style={{ fontSize: 11, color: '#A5B4FC', padding: '4px 8px' }}>
              Processing...
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

function PopButton({
  onClick,
  icon,
  label,
  disabled,
  danger,
}: {
  onClick: () => void;
  icon: string;
  label: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '8px 12px',
        background: 'transparent',
        border: 'none',
        borderRadius: 8,
        color: danger ? '#F87171' : '#E2E8F0',
        fontSize: 13,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        textAlign: 'left',
      }}
      onMouseEnter={(e) => {
        if (!disabled) (e.currentTarget.style.background = 'rgba(255,255,255,0.1)');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <span style={{ fontSize: 15 }}>{icon}</span>
      {label}
    </button>
  );
}
