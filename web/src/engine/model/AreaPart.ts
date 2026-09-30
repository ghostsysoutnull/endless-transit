import type { MarkLook } from './MarkLook.ts';

/** What a child adds to its parent's area (U04): its address and how it is marked. */
export interface AreaPart {
  readonly address: string;
  readonly mark: MarkLook;
}
