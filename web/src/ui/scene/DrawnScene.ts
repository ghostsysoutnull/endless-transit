import type { Curtain } from './Curtain.ts';
import type { ChildMark } from './ChildMark.ts';

/**
 * What the scene stage asks of every scene host (`SceneView`, and the plan's to come): mounted once in its host, it
 * rides, lights, comes back out and is taken down. Each host kind adds how it is shown its own sketch.
 */
export interface DrawnScene {
  mount(host: HTMLElement): void;
  /** Back out of the child with this id. */
  arrive(id: string): void;
  /** Whether a child picked from the list is the picture's to ride to. */
  leads(id: string): boolean;
  /** Ride to the child and pick it. Asked first: `leads`. */
  enter(id: string, curtain: Curtain): void;
  /** The child lit from the list, or none. */
  light(mark: ChildMark): void;
  dispose(): void;
}
