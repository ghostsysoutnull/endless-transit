/** What a moving picture asks of the page's one frame loop (`MotionClock`): the time now, and each frame while it listens. */
export interface Clock {
  /** Listens from the next frame on; the function returned stops listening. */
  subscribe(listener: (time: number) => void): () => void;
  now(): number;
}
