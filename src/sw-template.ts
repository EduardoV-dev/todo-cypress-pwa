import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

clientsClaim();
// @ts-ignore
self.skipWaiting();

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);
