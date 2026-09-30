import type { TraceSummary } from './TraceSummary.ts';

/** One level of the trace (U04): what its band shows. */
export type TraceStep = TraceSummary['steps'][number];
