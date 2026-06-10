'use client';

import { useEffect, useState } from 'react';
import { AppError } from '@/shared/types/errors.types';
import type { Interest, Perspective, Subgenre } from '@/shared/types/domain.types';
import { getInterests, getPerspectives, getSubgenres } from '../services/catalog.service';
import { CATALOG_MESSAGES } from '../constants/catalog.constants';

// Carga los tres catálogos en paralelo (con caching en el service).
export function useCatalog() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [subgenres, setSubgenres] = useState<Subgenre[]>([]);
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load(): Promise<void> {
      try {
        const [loadedInterests, loadedSubgenres, loadedPerspectives] = await Promise.all([
          getInterests(),
          getSubgenres(),
          getPerspectives(),
        ]);
        if (!active) return;
        setInterests(loadedInterests);
        setSubgenres(loadedSubgenres);
        setPerspectives(loadedPerspectives);
      } catch (caught) {
        if (!active) return;
        setError(caught instanceof AppError ? caught.message : CATALOG_MESSAGES.LOAD_ERROR);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, []);

  return { interests, subgenres, perspectives, isLoading, error };
}
