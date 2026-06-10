import {
  MIN_PERSPECTIVE_WEIGHT,
  MAX_PERSPECTIVE_WEIGHT,
} from '@/shared/constants/validation.constants';

export const WEIGHT_SLIDER_DEFAULT_MIN = MIN_PERSPECTIVE_WEIGHT;
export const WEIGHT_SLIDER_DEFAULT_MAX = MAX_PERSPECTIVE_WEIGHT;
export const WEIGHT_SLIDER_DEFAULT_STEP = 1 as const;

export const WEIGHT_SLIDER_WRAPPER_STYLES = 'flex items-center gap-3';
// La apariencia del slider (pista y pulgar) se define en globals.css.
export const WEIGHT_SLIDER_INPUT_STYLES = 'h-5 flex-1 cursor-pointer';
export const WEIGHT_SLIDER_VALUE_STYLES =
  'min-w-8 text-center font-display text-base font-semibold italic text-accent';
