/** What a scene host hears from its canvas (`SceneCanvas`): the pointer on the picture, and the host changing size. */
export interface CanvasInput {
  down(event: PointerEvent): void;
  move(event: PointerEvent): void;
  /** The finger lifted, or the browser took it away. */
  up(event: PointerEvent): void;
  leave(): void;
  tap(event: MouseEvent): void;
  resized(): void;
}
