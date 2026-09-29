import type { CorridorShape } from '#engine/model/CorridorShape.ts';
import type { DoorLook } from '#engine/model/DoorLook.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneVM } from './SceneVM.ts';

/** What the corridor draws (U02): how it runs, and each door by its look and the word written on it (empty when none). */
export interface CorridorVM extends SceneVM<
  SceneChild & { readonly door: { readonly look: DoorLook; readonly words: string } }
> {
  readonly shape: CorridorShape;
}
