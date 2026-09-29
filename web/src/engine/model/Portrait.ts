import type { PortraitReader } from './PortraitReader.ts';

/**
 * What a place's own picture is handed (U02): one member per drawn kind — the street, the tower, the corridor, the plan — and
 * `NoPortrait` for a place no picture draws. The portrait tells its reader which it is; nobody asks its kind.
 */
export interface Portrait {
  drawnBy<R>(reader: PortraitReader<R>): R;
}
