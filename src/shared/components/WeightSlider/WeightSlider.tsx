import type { WeightSliderProps } from './WeightSlider.types';
import {
  WEIGHT_SLIDER_DEFAULT_MIN,
  WEIGHT_SLIDER_DEFAULT_MAX,
  WEIGHT_SLIDER_DEFAULT_STEP,
  WEIGHT_SLIDER_WRAPPER_STYLES,
  WEIGHT_SLIDER_INPUT_STYLES,
  WEIGHT_SLIDER_VALUE_STYLES,
} from './WeightSlider.constants';

export function WeightSlider({
  value,
  onChange,
  min = WEIGHT_SLIDER_DEFAULT_MIN,
  max = WEIGHT_SLIDER_DEFAULT_MAX,
  step = WEIGHT_SLIDER_DEFAULT_STEP,
  disabled = false,
  id,
  ariaLabel,
}: WeightSliderProps) {
  return (
    <div className={WEIGHT_SLIDER_WRAPPER_STYLES}>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={WEIGHT_SLIDER_INPUT_STYLES}
      />
      <span className={WEIGHT_SLIDER_VALUE_STYLES}>{value}</span>
    </div>
  );
}
