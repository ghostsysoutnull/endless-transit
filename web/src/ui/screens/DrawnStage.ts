import type { ChildMark } from '#ui/scene/ChildMark.ts';
import type { Curtain } from '#ui/scene/Curtain.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';

/** What the world screen asks of the scene stage (`SceneStage`): its picture shown in its host, and the scene's calls. */
export interface DrawnStage {
  /**
   * The sketch shown in the host: the scene kept while the host and the picture stay, else made anew — told which
   * child its picture points at — and shown it; none without a host or a picture.
   */
  show(host: HTMLElement | null, sketch: Sketch, onLight: (mark: ChildMark) => void): void;
  /** A scene kept by the last `show` is drawn its sketch again; one made by it already shows it. */
  redraw(): void;
  /** Whether a scene is shown. */
  showing(): boolean;
  /** Back out of the child with this id. */
  arrive(id: string): void;
  /** Whether a child picked from the list is the picture's to ride to. */
  leads(id: string): boolean;
  /** Ride to the child and pick it. Asked first: `leads`. */
  enter(id: string, curtain: Curtain): void;
  /** The child lit from the list, or none. */
  light(mark: ChildMark): void;
  /** The scene taken down. */
  clear(): void;
}
