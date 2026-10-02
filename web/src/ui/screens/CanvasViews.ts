import type { SpectrumVM } from '#ui/canvas/SpectrumVM.ts';
import type { View } from '#ui/View.ts';
import type { MapPanelVM } from './MapPanelVM.ts';

/** How the world screen gets a view for each canvas it may carry (`CanvasViewMaker`): the pane's map, the map and the telemetry's spectrum. */
export interface CanvasViews {
  pane(): View<MapPanelVM['picture']>;
  map(): View<MapPanelVM['picture']>;
  spectrum(): View<SpectrumVM>;
}
