/** Where the plan's host mounts its MAP key (U03e): the screen says where, the host owns the key. */
export interface KeySlot {
  /** Takes the key in; `host` is the picture's own element, for a slot that sits by it. */
  hold(key: HTMLElement, host: HTMLElement): void;
}
