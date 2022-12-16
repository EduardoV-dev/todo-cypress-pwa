import { Workbox } from 'workbox-window';

const registerServiceWorker = async () => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        try {
            const wb = new Workbox('sw.js');
            wb.register();

            console.log('Service Worker Registered');
        } catch (error) {
            console.log('Service Worker Registration Failed');
        }
    }
};

export default registerServiceWorker;