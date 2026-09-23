import type { Location } from '#engine/model/Location.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { Coherence } from './Coherence.ts';
import type { MapSummary } from './MapSummary.ts';

/** The grid of the old `m` screen (LatticeMapComponent.groovy:32-33). */
const WIDTH = 30;
const HEIGHT = 15;
/** A child that lands on a taken cell moves along the row, then down, this many times (Container.groovy:65-70). */
const PROBES = 10;
const MARKS = 'marks';
const STATIC = 'static';
/** Below the bedrock the static replaces a glyph about one time in twelve (TelemetryComponent.groovy:38). */
const STATIC_CHANCE = 0.08;
const STATIC_GLYPHS = ['?', '!', '░', '▒', '▓', 'X', '#'] as const;

/**
 * Owns one fact: how a place's map is laid out — the children each on the cell their own seed names
 * (never two on one), the glitch marks of a low Coherence and the void's static both drawn on the frame
 * (`FrameEntropy`: the place and the step count), so the same place at the same step draws the same map
 * and a move draws another. Nothing for a kind that projects no map (a room, Guide:92).
 */
export class LatticeMap {
  of(
    place: Location,
    seen: (place: Location) => boolean,
    coherence: Coherence,
    frame: Seed,
  ): MapSummary | null {
    if (!place.mapped()) return null;
    const taken = new Set<string>();
    const cell = (x: number, y: number): string => `${String(x)},${String(y)}`;
    const noise = frame.branch(STATIC);
    const nodes = place.mapNodes().map((child, index) => {
      let { x, y } = child.mapSpot(WIDTH, HEIGHT);
      for (let probe = 0; taken.has(cell(x, y)) && probe < PROBES; probe++) {
        x = (x + 1) % WIDTH;
        if (x === 0) y = (y + 1) % HEIGHT;
      }
      taken.add(cell(x, y));
      const roll = noise.branch(index);
      const eaten = place.abyssal() && roll.probability(STATIC_CHANCE);
      return {
        x,
        y,
        glyph: eaten ? roll.branch('glyph').pick(STATIC_GLYPHS) : child.mapGlyph(),
        name: child.name(),
        visited: seen(child),
        noise: eaten,
      };
    });
    const marks = frame.branch(MARKS);
    return {
      width: WIDTH,
      height: HEIGHT,
      origin: { name: place.name(), glyph: place.mapGlyph() },
      frame: place.vibe()?.frame() ?? null,
      abyssal: place.abyssal(),
      nodes,
      marks: Array.from({ length: coherence.glitchMarks() }, (_, i) => ({
        x: marks
          .branch(i)
          .branch('x')
          .range(0, WIDTH - 1),
        y: marks
          .branch(i)
          .branch('y')
          .range(0, HEIGHT - 1),
      })),
    };
  }
}
