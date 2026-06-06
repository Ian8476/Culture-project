// Carga los catálogos iniciales (intereses, subgéneros, perspectivas) en Firestore
// usando firebase-admin y la service account key (no versionada).
//
// Ejecutar con: pnpm seed
//
// Requiere FIREBASE_ADMIN_CREDENTIALS_PATH en .env.local apuntando al JSON de la
// cuenta de servicio descargada de Firebase Console > Project settings > Service accounts.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { config as loadEnv } from 'dotenv';
import { cert, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { COLLECTIONS } from '../src/lib/firebase/collections';
import { SEED_INTERESTS, SEED_PERSPECTIVES, SEED_SUBGENRES } from './seed.data';

const ENV_FILE = '.env.local';
const CREDENTIALS_ENV_KEY = 'FIREBASE_ADMIN_CREDENTIALS_PATH';
const ACTIVE_FIELD = 'active';

loadEnv({ path: ENV_FILE });

function loadServiceAccount(): ServiceAccount {
  const credentialsPath = process.env[CREDENTIALS_ENV_KEY];
  if (credentialsPath === undefined || credentialsPath.length === 0) {
    throw new Error(`Falta ${CREDENTIALS_ENV_KEY} en ${ENV_FILE}.`);
  }
  const raw = readFileSync(resolve(credentialsPath), 'utf-8');
  return JSON.parse(raw) as ServiceAccount;
}

async function seed(): Promise<void> {
  initializeApp({ credential: cert(loadServiceAccount()) });
  const db = getFirestore();
  const batch = db.batch();

  for (const interest of SEED_INTERESTS) {
    const reference = db.collection(COLLECTIONS.INTERESTS).doc(interest.slug);
    batch.set(reference, { ...interest, [ACTIVE_FIELD]: true });
  }

  for (const subgenre of SEED_SUBGENRES) {
    const reference = db.collection(COLLECTIONS.SUBGENRES).doc(subgenre.slug);
    batch.set(reference, { ...subgenre, [ACTIVE_FIELD]: true });
  }

  for (const perspective of SEED_PERSPECTIVES) {
    const reference = db.collection(COLLECTIONS.PERSPECTIVES).doc(perspective.slug);
    batch.set(reference, { ...perspective, [ACTIVE_FIELD]: true });
  }

  await batch.commit();

  const total = SEED_INTERESTS.length + SEED_SUBGENRES.length + SEED_PERSPECTIVES.length;
  console.log(`Seed completado: ${total} documentos escritos.`);
}

seed().catch((error: unknown) => {
  console.error('Error en el seed:', error);
  process.exitCode = 1;
});
