/**
 * Where the engine says that something is wrong but playable — a content file an index promised is
 * missing and a generic line stands in (`[THEME_WARN]`, Guide:319). Injected: the engine has no console.
 * A silent fallback on a meaningful value is the bug the Groovy audit found; this is its guard.
 */
export interface WarningSink {
  warn(message: string): void;
}
