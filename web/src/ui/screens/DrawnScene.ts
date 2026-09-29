import type { Sketch } from '#ui/scene/Sketch.ts';
import type { View } from '#ui/View.ts';

/** What the world screen asks of the scene it draws (`SceneView`): a view that also rides, lights and comes back out. */
export interface DrawnScene extends View<Sketch> {
  /** Back out of the child with this id. */
  arrive(id: string): void;
  /** Whether a child picked from the list is the picture's to ride to. */
  leads(id: string): boolean;
  /** Ride to the child and pick it. Asked first: `leads`. */
  enter(id: string): void;
  /** The child lit from the list (its id), or none (empty). */
  light(id: string): void;
}
