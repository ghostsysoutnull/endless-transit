/** What a camera's track asks of the slider laid over the picture (`SceneSlider`): lie over this box, or hide. */
export interface SliderFace {
  /** Laid over this box on the picture (CSS pixels), running along `axis`. */
  placeAt(
    box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number },
    axis: 'x' | 'y',
  ): void;
  hide(): void;
}
