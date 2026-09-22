import type { WarningSink } from '#engine/content/WarningSink.ts';

/** The browser console: a `[THEME_WARN]` line is a bug report, and the browser tests fail on it. */
export class ConsoleWarningSink implements WarningSink {
  warn(message: string): void {
    console.warn(message);
  }
}
