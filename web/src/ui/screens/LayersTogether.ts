import type { PadGroup } from './PadGroup.ts';

/** The one group every Layer falls in: below every floor's ten, so shown first. */
const LAYERS = -1;

/** Every Layer falls in one group, before every floor's. */
export class LayersTogether implements PadGroup {
  of(): number {
    return LAYERS;
  }
}
