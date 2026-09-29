import type { Quad } from './Quad.ts';
import type { SceneHit } from './SceneHit.ts';
import type { CorridorVM } from './CorridorVM.ts';

/** A door can be tapped while this near and this wide; its number shows while this near, its word nearer still. */
const REACH = 11;
const LEAST_WIDTH = 6;
const NUMBER_NEAR = 7;
/** Only the nearest pair's words: at the 12 px floor the mock's 4.5 lets the next pair's words run into each other. */
const WORD_NEAR = 3;
/** The fog past which a door's number is written in the dim ink. */
const FAINT = 0.5;

/**
 * A door where the view puts it (U02, the corridor): the child it draws, how deep it stands, the fog on it and its
 * outline on the picture — and what that means: whether a finger can reach it, whether its number and its word show,
 * whether it is faint, where a tap finds it. Value object, made per frame.
 */
export class PlacedDoor {
  readonly #child: CorridorVM['children'][number];
  readonly #depth: number;
  readonly #fog: number;
  readonly #quad: Quad;

  constructor(facts: { child: CorridorVM['children'][number]; depth: number; fog: number; quad: Quad }) {
    this.#child = facts.child;
    this.#depth = facts.depth;
    this.#fog = facts.fog;
    this.#quad = facts.quad;
  }

  child(): CorridorVM['children'][number] {
    return this.#child;
  }

  quad(): Quad {
    return this.#quad;
  }

  fog(): number {
    return this.#fog;
  }

  /** Orders doors far to near, the order they are drawn in. */
  fartherFirst(other: PlacedDoor): number {
    return other.#depth - this.#depth;
  }

  /** Whether a finger can find it: near enough and wide enough. */
  inReach(): boolean {
    return this.#depth < REACH && this.#quad.width() > LEAST_WIDTH;
  }

  /** Where a tap finds it (the mock's box round the door and its number), and the point a zoom centres on. */
  hit(): SceneHit {
    const quad = this.#quad;
    return {
      id: this.#child.id,
      x: quad.left() - 4,
      y: quad.top() - 18,
      width: quad.width() + 8,
      height: quad.height() + 22,
      anchor: quad.middle(),
    };
  }

  /** Whether its number is written: near, or named in full (lit, or the door you stand by). */
  showsNumber(named: boolean): boolean {
    return this.#depth < NUMBER_NEAR || named;
  }

  /** The word written on it; empty when none. */
  word(): string {
    return this.#child.door.words;
  }

  /** Whether its word is written: it has one and is among the nearest. */
  showsWord(): boolean {
    return this.word() !== '' && this.#depth < WORD_NEAR;
  }

  /** Whether the fog on it is thick enough that its number goes dim. */
  faint(): boolean {
    return this.#fog < FAINT;
  }
}
