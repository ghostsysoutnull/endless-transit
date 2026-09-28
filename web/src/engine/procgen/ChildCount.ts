/** How many children a parent draws: `min … max` on its seed, times `unit` (1 unless named); none when the parent decides. */
export type ChildCount = { readonly min: number; readonly max: number; readonly unit?: number } | undefined;
