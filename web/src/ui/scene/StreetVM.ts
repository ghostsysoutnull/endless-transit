import type { SceneChild } from './SceneChild.ts';
import type { SceneVM } from './SceneVM.ts';

/** What the street draws (U01b): each building by how many floors it stands and how many doors each has. */
export type StreetVM = SceneVM<SceneChild & { readonly floors: number; readonly doors: number }>;
