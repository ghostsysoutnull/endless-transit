import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';

/** The room you stand in, drawn in full, on the picture (U03b): its box inside its walls, and its back wall within it. */
export interface InsideFrame {
  readonly room: PlanBoxOnPicture;
  readonly back: PlanBoxOnPicture;
}
