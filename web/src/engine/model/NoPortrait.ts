import type { Portrait } from './Portrait.ts';
import type { PortraitReader } from './PortraitReader.ts';

/** A place no picture draws: the screen stays as it was. */
export class NoPortrait implements Portrait {
  drawnBy<R>(reader: PortraitReader<R>): R {
    return reader.unseen();
  }
}
