import type { Fragment } from './Fragment.ts';

/** What a place that holds things holds: what can be taken, and what is only furniture. */
export interface Contents {
  readonly objects: readonly Fragment[];
  readonly furniture: readonly string[];
}
