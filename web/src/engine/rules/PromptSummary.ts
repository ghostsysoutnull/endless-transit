/**
 * A pending prompt, as plain data: which one it is (a stable key each screen claims — `reboot`, `recap`),
 * the outcome it reached (an ending), and its figures by stable key (`locus`, `steps`, `places`).
 */
export interface PromptSummary {
  readonly id: string;
  readonly outcome: string;
  readonly figures: Readonly<Record<string, string>>;
}
