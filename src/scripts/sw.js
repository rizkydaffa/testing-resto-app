import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

const restaurantApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-api',
  }),
);

const restaurantImageApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-image-api',
  }),
);

registerRoute(restaurantApi);
registerRoute(restaurantImageApi);

self.addEventListener('install', () => {
  console.log('service worker: installed');
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  console.log('service worker: push event received', event);

  const notificationData = {
    title: 'New Notification',
    Option: {
      body: 'This is a new notification',
      icon: '/favicon.png',
      image: '/icon-512x512.png',
    },
  };

  const showNotification = self.registration.showNotification(
    notificationData.title,
    notificationData.Option,
  );

  event.waitUntill(showNotification);
});
