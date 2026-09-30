import type { View } from '#ui/View.ts';
import type { MapPanelVM } from './MapPanelVM.ts';

/** How the world screen gets a view for each canvas it may carry (`CanvasViewMaker`): the pane's map and the map. */
export interface CanvasViews {
  pane(): View<MapPanelVM['picture']>;
  map(): View<MapPanelVM['picture']>;
}
