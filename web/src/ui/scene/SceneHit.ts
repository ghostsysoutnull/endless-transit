/** Where a child of a scene is drawn: the box a tap finds it by, and the point a zoom centres on. CSS pixels. */
export interface SceneHit {
  /** The child's option id: what a pick runs. */
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly anchor: { readonly x: number; readonly y: number };
}
