/** What a passage asks of the screen it plays over: where that screen is drawn, and to be drawn again. */
export interface PassageScreen {
  readonly container: HTMLElement;
  repaint(): void;
}
