import { Apartment } from './Apartment.ts';
import type { Fact } from './Fact.ts';
import { LocationKind } from './LocationKind.ts';

export const CRYPT_KIND = new LocationKind({ key: 'crypt', title: 'Crypt', icon: '🚪', indexLabel: 'UNIT' });

/**
 * An apartment below the bedrock (Guide:279; Apartment.groovy:26-43): dealt from the abyssal list in the
 * atomic era, its rooms Shards. It differs in its words only — the resonance warning where an apartment
 * shows its era marker — and answers for them itself.
 */
export class Crypt extends Apartment {
  override kind(): LocationKind {
    return CRYPT_KIND;
  }

  /** `[ABYSSAL_RESONANCE_DETECTED]` (Apartment.groovy:41-42). */
  override facts(): readonly Fact[] {
    return [{ key: 'alert', label: 'ABYSSAL_RESONANCE', value: 'DETECTED' }];
  }

  override status(): string {
    return 'ATMOS: [PRESSURE_HIGH]';
  }
}
