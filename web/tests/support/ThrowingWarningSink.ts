import type { WarningSink } from '#engine/content/WarningSink.ts';

/** Test double, the suite's default: a warning anywhere is a failed test, never a message nobody reads. */
export class ThrowingWarningSink implements WarningSink {
  warn(message: string): void {
    throw new Error(`a warning fired where none may: ${message}`);
  }
}
