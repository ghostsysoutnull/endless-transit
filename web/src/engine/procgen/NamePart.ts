import type { Vibe } from '#engine/model/Vibe.ts';

/** What `NameParts` asks of one part of a name: its name in the index, and the list it reads under a vibe. */
export interface NamePart {
  name(): string;
  list(vibe: Vibe | undefined): string;
}
