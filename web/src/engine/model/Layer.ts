import type { Building } from './Building.ts';
import type { Fact } from './Fact.ts';
import { Floor } from './Floor.ts';
import type { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const LAYER_KIND = new LocationKind({ key: 'layer', title: 'Layer', icon: '▤', indexLabel: 'STRATA' });

/** Every Layer is the substrate (Building.groovy:79). */
const ZONE = 'ABYSSAL_SUBSTRATE';
/** The pressure reading: ten percent a layer, saturating at 100 (Building.groovy:93-97; Guide:505-506). */
const PRESSURE_PER_LAYER = 10;
const PRESSURE_TOP = 100;
/** A prompt below the bedrock costs twice (Guide:137-139; TurnProcessor.groovy:52). */
const DRAIN = 2;

/**
 * A floor below a building's bedrock (Guide:277-284; Floor.groovy:88-124): Layer −k, named in hex, reached
 * from the lobby once the breach is made. A Layer is a floor in every mechanical sense — its elevator, its
 * corridor mode, its one child (an Artery) — and answers for what differs: its name, its zone, the pressure
 * where a floor has integrity, the abyssal diagnostic, double drain, and that everything under it is abyssal.
 * Its own screens read the street's era for the drain (Guide:138): the Artery below it does not.
 */
export class Layer extends Floor {
  constructor(origin: Origin<Building>, facts: { number: number; sentence: string }) {
    super(origin, { number: facts.number, zone: ZONE, sentence: facts.sentence });
  }

  override kind(): LocationKind {
    return LAYER_KIND;
  }

  /** `Layer -0x1` … (Floor.groovy:110-112). */
  override name(): string {
    return `Layer -0x${Math.abs(this.number()).toString(16).toUpperCase()}`;
  }

  /** The zone, the pressure in place of integrity, the resonance. */
  override readings(): readonly Fact[] {
    const pressure = Math.min(PRESSURE_TOP, Math.abs(this.number()) * PRESSURE_PER_LAYER);
    return [
      { key: 'zone', label: 'FUNCTION', value: ZONE },
      { key: 'reading', label: 'ST', value: `P: ${String(pressure)}%` },
      { key: 'reading', label: 'RES', value: `${String(this.resonance())}Hz` },
    ];
  }

  /** Sealed until the bedrock is breached: nowhere for the walker, so no save can stand on it (Building.groovy:255). */
  override sealed(): boolean {
    return !this.building().breached();
  }

  override diagnostic(): string {
    return 'SYSTEM_STATUS: [ABYSS_SYNC]';
  }

  override abyssal(): boolean {
    return true;
  }

  override drainFactor(): number {
    return DRAIN;
  }

  /** A Layer stands among the Layers. */
  override peers(): readonly Location[] {
    return this.building().children().slice(this.building().floors());
  }
}
