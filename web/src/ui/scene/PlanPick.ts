/** What a plan motion asks when it ends (`PlanScene`): the option with this id picked. */
export interface PlanPick {
  pick(id: string): void;
}
