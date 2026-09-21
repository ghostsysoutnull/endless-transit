/** An action as the screen shows it. Every option becomes a real `<button data-option="id">`. */
export interface OptionVM {
  readonly id: string;
  readonly key: string;
  readonly label: string;
}
