/**
 * Where frames come from and what time it is, in milliseconds: the browser's animation frames in the page
 * (`#platform/BrowserFrameSource.ts`, built in `main.ts`), a hand-driven source in a test.
 */
export interface FrameSource {
  /** Asks for one frame; the callback gets the frame's time. The handle cancels it. */
  request(callback: (time: number) => void): number;
  cancel(handle: number): void;
  now(): number;
}
