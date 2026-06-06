import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as firestore from 'firebase/firestore';
import { PROFILE_DOC_FIELDS } from '../constants/profile.constants';
import type { ProfileFormValues } from '../types/profile.types';
import { createProfile, getProfile, updateProfile } from './profile.service';

vi.mock('@/lib/firebase/client', () => ({ db: {} }));
vi.mock('@/lib/firebase/converters', () => ({ profileConverter: {} }));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  serverTimestamp: vi.fn(() => 'SERVER_TS'),
}));

const ref = { withConverter: vi.fn(() => ref) };

const values: ProfileFormValues = {
  displayName: '  Ana  ',
  bio: '  Me gusta el cine  ',
  interests: { cine: { knowledgeLevel: 'ADVANCED' } },
  subgenres: { drama: true },
  perspectives: { trama: { weight: 4 } },
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(firestore.doc).mockReturnValue(ref as never);
});

describe('getProfile', () => {
  it('devuelve el perfil cuando el documento existe', async () => {
    const sample = { id: 'u1', displayName: 'Ana' };
    vi.mocked(firestore.getDoc).mockResolvedValue({
      exists: () => true,
      data: () => sample,
    } as never);

    const result = await getProfile('u1');
    expect(result).toEqual(sample);
  });

  it('devuelve null cuando el documento no existe', async () => {
    vi.mocked(firestore.getDoc).mockResolvedValue({ exists: () => false } as never);
    const result = await getProfile('u1');
    expect(result).toBeNull();
  });
});

describe('createProfile', () => {
  it('escribe displayName recortado, bio normalizada y marcas de tiempo', async () => {
    vi.mocked(firestore.setDoc).mockResolvedValue(undefined as never);

    await createProfile('u1', values);

    expect(firestore.setDoc).toHaveBeenCalledTimes(1);
    const written = vi.mocked(firestore.setDoc).mock.calls[0][1] as Record<string, unknown>;
    expect(written[PROFILE_DOC_FIELDS.DISPLAY_NAME]).toBe('Ana');
    expect(written[PROFILE_DOC_FIELDS.BIO]).toBe('Me gusta el cine');
    expect(written[PROFILE_DOC_FIELDS.AVATAR_URL]).toBeNull();
    expect(written[PROFILE_DOC_FIELDS.COMPLETED_AT]).toBe('SERVER_TS');
    expect(written[PROFILE_DOC_FIELDS.CREATED_AT]).toBe('SERVER_TS');
  });

  it('normaliza una bio vacía a null', async () => {
    vi.mocked(firestore.setDoc).mockResolvedValue(undefined as never);

    await createProfile('u1', { ...values, bio: '   ' });

    const written = vi.mocked(firestore.setDoc).mock.calls[0][1] as Record<string, unknown>;
    expect(written[PROFILE_DOC_FIELDS.BIO]).toBeNull();
  });
});

describe('updateProfile', () => {
  it('actualiza sin tocar createdAt ni completedAt', async () => {
    vi.mocked(firestore.updateDoc).mockResolvedValue(undefined as never);

    await updateProfile('u1', values);

    expect(firestore.updateDoc).toHaveBeenCalledTimes(1);
    const written = vi.mocked(firestore.updateDoc).mock.calls[0][1] as unknown as Record<
      string,
      unknown
    >;
    expect(written[PROFILE_DOC_FIELDS.UPDATED_AT]).toBe('SERVER_TS');
    expect(written[PROFILE_DOC_FIELDS.CREATED_AT]).toBeUndefined();
    expect(written[PROFILE_DOC_FIELDS.COMPLETED_AT]).toBeUndefined();
  });
});
