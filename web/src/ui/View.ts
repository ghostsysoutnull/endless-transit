/**
 * The seam between the game and whatever draws it. A view is mounted once, then handed a fresh view-model
 * after every step; it keeps its nodes alive between renders (focus, scroll and transitions survive).
 */
export interface View<VM> {
  mount(container: HTMLElement): void;
  render(vm: VM): void;
  dispose(): void;
}
