import { resetDb } from './test-db-utils';
import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents: (on, config) => {
            on('task', {
                resetTestDb: () => {
                    resetDb();

                    return null;
                },
            });
        },
    },
});
