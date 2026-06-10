import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  indexedDBLocalPersistence,
  type Auth,
} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Las claves del cliente de Firebase son públicas por diseño (el SDK las usa en el
// browser). La seguridad real se delega a las Firestore Security Rules.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Evita reinicializar el SDK en hot-reload / múltiples imports.
const firebaseApp: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Persistencia local explícita: la sesión sobrevive a cerrar la pestaña o el
// navegador (IndexedDB con respaldo en localStorage). En SSR no hay browser
// storage, y en hot-reload initializeAuth lanza si ya fue inicializado: en
// ambos casos getAuth devuelve la instancia con su configuración previa.
function createAuth(app: FirebaseApp): Auth {
  if (typeof window === 'undefined') return getAuth(app);
  try {
    return initializeAuth(app, {
      persistence: [indexedDBLocalPersistence, browserLocalPersistence],
    });
  } catch {
    return getAuth(app);
  }
}

export const auth: Auth = createAuth(firebaseApp);
export const db: Firestore = getFirestore(firebaseApp);

export { firebaseApp };
