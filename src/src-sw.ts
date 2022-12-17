import { registerRoute } from 'workbox-routing';
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

import { TODOS_ENDPOINT } from './api';

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

const networkFirstRoutes: string[] = [TODOS_ENDPOINT];

registerRoute(
    ({ url }) => networkFirstRoutes.includes(url.href),
    new NetworkFirst(),
);

const bgSyncPlugin = new BackgroundSyncPlugin('todo-pwa', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

type TBgSyncMethod = 'POST' | 'PUT' | 'DELETE';

const handleBgSync = (endpoint: string, method: TBgSyncMethod) =>
    registerRoute(
        new RegExp(`${endpoint}${method !== 'POST' ? '/' : ''}`),
        new NetworkOnly({
            plugins: [bgSyncPlugin],
        }),
        method,
    );

handleBgSync(TODOS_ENDPOINT, 'POST');
handleBgSync(TODOS_ENDPOINT, 'PUT');
handleBgSync(TODOS_ENDPOINT, 'DELETE');
