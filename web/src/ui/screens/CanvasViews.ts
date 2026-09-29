import type { TracePictureVM } from '#ui/canvas/TracePictureVM.ts';
import type { View } from '#ui/View.ts';
import type { MapPanelVM } from './MapPanelVM.ts';

/** How the world screen gets a view for each canvas it may carry (`CanvasViewMaker`): the pane's map, the map, the trace. */
export interface CanvasViews {
  pane(): View<MapPanelVM['picture']>;
  map(): View<MapPanelVM['picture']>;
  trace(): View<TracePictureVM>;
}
