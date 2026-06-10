// Tests de las Firestore Security Rules. Requieren el emulador de Firestore.
// Ejecutar con: pnpm test:rules  (levanta el emulador automáticamente).

import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const PROJECT_ID = 'demo-culture-platform';
const FIRESTORE_HOST = '127.0.0.1';
const FIRESTORE_PORT = 8181;
const RULES_PATH = 'firestore.rules';

const ALICE = 'alice';
const BOB = 'bob';

let testEnv: RulesTestEnvironment;

// Perfil con la forma mínima válida que exigen las rules.
const validProfile = {
  displayName: 'Alice',
  bio: null,
  avatarUrl: null,
  interests: {},
  subgenres: {},
  perspectives: {},
  completedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: readFileSync(RULES_PATH, 'utf-8'),
      host: FIRESTORE_HOST,
      port: FIRESTORE_PORT,
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('profiles', () => {
  it('el dueño puede crear su perfil con forma válida', async () => {
    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertSucceeds(setDoc(doc(db, 'profiles', ALICE), validProfile));
  });

  it('rechaza un displayName demasiado corto', async () => {
    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertFails(setDoc(doc(db, 'profiles', ALICE), { ...validProfile, displayName: 'Al' }));
  });

  it('un usuario no puede escribir el perfil de otro', async () => {
    const db = testEnv.authenticatedContext(BOB).firestore();
    await assertFails(setDoc(doc(db, 'profiles', ALICE), validProfile));
  });

  it('cualquier usuario autenticado puede leer perfiles', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'profiles', ALICE), validProfile);
    });
    const db = testEnv.authenticatedContext(BOB).firestore();
    await assertSucceeds(getDoc(doc(db, 'profiles', ALICE)));
  });

  it('un usuario sin sesión no puede leer perfiles', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, 'profiles', ALICE)));
  });
});

describe('users', () => {
  it('el dueño puede leer y escribir su documento', async () => {
    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertSucceeds(setDoc(doc(db, 'users', ALICE), { email: 'alice@example.com' }));
    await assertSucceeds(getDoc(doc(db, 'users', ALICE)));
  });

  it('un usuario no puede leer el documento de otro', async () => {
    const db = testEnv.authenticatedContext(BOB).firestore();
    await assertFails(getDoc(doc(db, 'users', ALICE)));
  });
});

// Discusión con la forma mínima válida que exigen las rules (authorId se ajusta por test).
function validDiscussion(authorId: string) {
  return {
    subgenreSlug: 'drama',
    interestSlug: 'cine',
    title: 'Parásitos y la escalera',
    body: 'Análisis de la simbología vertical.',
    hasSpoilers: true,
    authorId,
    authorName: 'Alice Pérez',
    createdAt: new Date(),
  };
}

function validComment(authorId: string) {
  return {
    body: 'Gran punto.',
    hasSpoilers: false,
    authorId,
    authorName: 'Bob Gómez',
    createdAt: new Date(),
  };
}

describe('discussions', () => {
  it('un usuario autenticado puede crear una discusión firmada por sí mismo', async () => {
    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertSucceeds(setDoc(doc(db, 'discussions', 'd1'), validDiscussion(ALICE)));
  });

  it('rechaza una discusión firmada con otro authorId', async () => {
    const db = testEnv.authenticatedContext(BOB).firestore();
    await assertFails(setDoc(doc(db, 'discussions', 'd2'), validDiscussion(ALICE)));
  });

  it('rechaza una discusión con título demasiado corto', async () => {
    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertFails(
      setDoc(doc(db, 'discussions', 'd3'), { ...validDiscussion(ALICE), title: 'ab' }),
    );
  });

  it('nadie puede editar una discusión publicada', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'discussions', 'd4'), validDiscussion(ALICE));
    });
    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertFails(updateDoc(doc(db, 'discussions', 'd4'), { title: 'Editado' }));
  });

  it('un usuario sin sesión no puede leer discusiones', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, 'discussions', 'd1')));
  });

  it('un usuario autenticado puede comentar una discusión', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'discussions', 'd5'), validDiscussion(ALICE));
    });
    const db = testEnv.authenticatedContext(BOB).firestore();
    await assertSucceeds(
      setDoc(doc(collection(db, 'discussions', 'd5', 'comments')), validComment(BOB)),
    );
  });

  it('rechaza un comentario firmado con otro authorId', async () => {
    const db = testEnv.authenticatedContext(BOB).firestore();
    await assertFails(
      setDoc(doc(collection(db, 'discussions', 'd5', 'comments')), validComment(ALICE)),
    );
  });
});

describe('catálogos', () => {
  it('un usuario autenticado puede leer pero no escribir', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'interests', 'cine'), {
        name: 'Cine',
        slug: 'cine',
        active: true,
      });
    });
    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertSucceeds(getDoc(doc(db, 'interests', 'cine')));
    await assertFails(setDoc(doc(db, 'interests', 'teatro'), { name: 'Teatro' }));
  });
});
