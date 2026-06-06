import type { InputType } from './Input.types';

export const INPUT_DEFAULT_TYPE: InputType = 'text';

export const INPUT_BASE_STYLES =
  'w-full rounded-lg border bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-900 dark:text-zinc-100';

export const INPUT_BORDER_DEFAULT =
  'border-zinc-300 focus-visible:ring-indigo-500 dark:border-zinc-700';
export const INPUT_BORDER_ERROR = 'border-red-500 focus-visible:ring-red-500';
