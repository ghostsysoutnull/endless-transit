import type { Vibe } from '#engine/model/Vibe.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/**
 * What `NameParts` asks of one part of a name: its name in the index, and the list it reads for the
 * children of a parent (by the parent's seed) under a vibe.
 */
export interface NamePart {
  name(): string;
  list(among: { readonly parent: Seed; readonly vibe: Vibe | undefined }): string;
}
