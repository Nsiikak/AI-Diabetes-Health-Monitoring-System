import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Load Firebase service account key
const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../config/firebase-admin.json'),
    'utf-8',
  ),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://diabetes-monitoring-syst-ebd9d.firebaseio.com', // Replace with your database URL if using Firestore RTDB
});

export const firestore = admin.firestore();
export const auth = admin.auth();
