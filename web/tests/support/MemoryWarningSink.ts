import type { WarningSink } from '#engine/content/WarningSink.ts';

/** Test double: keeps every warning so a test can assert one fired — or that none did. */
export class MemoryWarningSink implements WarningSink {
  readonly #messages: string[] = [];

  warn(message: string): void {
    this.#messages.push(message);
  }

  messages(): readonly string[] {
    return this.#messages;
  }
}
