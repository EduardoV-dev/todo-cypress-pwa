import * as fs from 'fs';
import * as path from 'path';

const dbPath = path.join(__dirname, 'test-db.json');

export const resetDb = () => {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const collections = Object.keys(db);

    const noRecordsDb = collections.reduce((acc, collection) => {
        acc[collection] = [];

        return acc;
    }, {});

    fs.writeFileSync(dbPath, JSON.stringify(noRecordsDb, null, 4), 'utf-8');
};
