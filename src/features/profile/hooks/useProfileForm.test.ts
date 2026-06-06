import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProfileForm } from './useProfileForm';
import {
  DEFAULT_KNOWLEDGE_LEVEL,
  DEFAULT_PERSPECTIVE_WEIGHT,
} from '../constants/profile.constants';

describe('useProfileForm', () => {
  it('inicializa con valores vacíos por defecto', () => {
    const { result } = renderHook(() => useProfileForm());
    expect(result.current.values.displayName).toBe('');
    expect(result.current.values.interests).toEqual({});
  });

  it('activa un interés con el nivel por defecto y luego lo cambia', () => {
    const { result } = renderHook(() => useProfileForm());

    act(() => result.current.toggleInterest('cine'));
    expect(result.current.values.interests.cine.knowledgeLevel).toBe(DEFAULT_KNOWLEDGE_LEVEL);

    act(() => result.current.setKnowledgeLevel('cine', 'EXPERT'));
    expect(result.current.values.interests.cine.knowledgeLevel).toBe('EXPERT');
  });

  it('desactiva un interés al togglear de nuevo', () => {
    const { result } = renderHook(() => useProfileForm());
    act(() => result.current.toggleInterest('cine'));
    act(() => result.current.toggleInterest('cine'));
    expect(result.current.values.interests).toEqual({});
  });

  it('gestiona subgéneros y perspectivas con peso por defecto', () => {
    const { result } = renderHook(() => useProfileForm());

    act(() => result.current.toggleSubgenre('drama'));
    expect(result.current.values.subgenres.drama).toBe(true);

    act(() => result.current.togglePerspective('trama'));
    expect(result.current.values.perspectives.trama.weight).toBe(DEFAULT_PERSPECTIVE_WEIGHT);

    act(() => result.current.setPerspectiveWeight('trama', 5));
    expect(result.current.values.perspectives.trama.weight).toBe(5);
  });

  it('actualiza displayName y bio', () => {
    const { result } = renderHook(() => useProfileForm());
    act(() => result.current.setDisplayName('Ana'));
    act(() => result.current.setBio('Hola'));
    expect(result.current.values.displayName).toBe('Ana');
    expect(result.current.values.bio).toBe('Hola');
  });
});
