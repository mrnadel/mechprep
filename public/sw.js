// Service worker for MechReady PWA + Push Notifications

// ─── Push Notifications ────────────────────────────────────

self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || '',
    icon: data.icon || '/icon-192.png',
    badge: data.badge || '/icon-badge.png',
    tag: data.tag || 'mechready',
    data: { url: data.url || '/' },
    vibrate: [100, 50, 100],
    actions: [{ action: 'open', title: 'Open MechReady' }],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'MechReady', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // Focus existing tab if open
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      // Otherwise open new tab
      return self.clients.openWindow(url);
    })
  );
});

