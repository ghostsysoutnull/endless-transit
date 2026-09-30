import type { AreaLook } from '#engine/model/AreaLook.ts';
import type { MarkLook } from '#engine/model/MarkLook.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneVM } from './SceneVM.ts';

/** A child of a level above the street (U04), with how it is marked. */
export type AreaChild = SceneChild & { readonly mark: MarkLook };

/** What a level above the street draws (U04): which drawing it is, its children as marks, a null reach's signal. */
export type AreaVM = SceneVM<AreaChild> & { readonly look: AreaLook; readonly signal: number };
