import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';

const firebaseConfig =
  process.env.NODE_ENV === 'production'
    ? {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIN_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
      }
    : {
        apiKey: process.env.NEXT_PUBLIC_DEV_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_DEV_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_DEV_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_DEV_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_DEV_MESSAGIN_ID,
        appId: process.env.NEXT_PUBLIC_DEV_APP_ID,
      };

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

export const authService = getAuth(firebaseApp);
export const dbService = getFirestore(firebaseApp);
export const storageService = getStorage(firebaseApp);
