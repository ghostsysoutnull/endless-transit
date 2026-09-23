import type { GameOption } from './GameOption.ts';
import type { Journey } from './Journey.ts';
import type { Prompt } from './Prompt.ts';
import type { PromptSummary } from './PromptSummary.ts';
import type { Reply } from './Reply.ts';
import { systemOption } from './SystemOption.ts';

export const BUFFER = 'buffer';
const PICK = 'pick:';
const DROP = 'drop:';
const CLOSE = 'close';
/** Keyboard extras for the picks, in order: the digits. */
const DIGITS = Array.from({ length: 9 }, (_, n) => String(n + 1));

/**
 * The buffer screen (Guide:124-126, QuantumBufferController.groovy:13-52) as a pending prompt: while it is
 * open its answers are the only things on offer, and none of them costs anything — the old screen read
 * its own commands outside the turn. A merge is two picks: the first selects a fragment, the second, on
 * another, merges them (Guide:241-243) and gives fifteen back (Guide:141); picking the selected one again
 * unselects it — or, inside a primed building, forges its Keystone (Guide:250-252, 271-274). In a room, every
 * fragment can be dropped where the traveller stands (Guide:120-121); the
 * old screen's destroy is not carried — with a capacity, a drop covers every use. Back to reality closes
 * it. The selection is the prompt's own and is not saved: a reload lands in the world.
 */
export class BufferPrompt implements Prompt {
  readonly #journey: Journey;
  #selected: number | undefined;

  constructor(journey: Journey) {
    this.#journey = journey;
  }

  summary(): PromptSummary {
    return {
      id: BUFFER,
      outcome: '',
      figures: { selected: this.#selected === undefined ? '' : String(this.#selected) },
    };
  }

  options(): readonly GameOption[] {
    const fragments = this.#journey.player().buffer().fragments();
    const inARoom = this.#journey.here()?.contents() !== null;
    const pickLabel = (index: number): string => {
      if (this.#selected === undefined) return 'Select';
      return this.#selected === index ? 'Unselect' : 'Merge';
    };
    return [
      ...fragments.flatMap((_fragment, index) => {
        const ordinal = String(index + 1);
        const pick: GameOption = {
          ...systemOption(`${PICK}${String(index)}`, DIGITS[index] ?? '', pickLabel(index)),
          role: 'pick',
          ordinal,
        };
        const drop: GameOption = {
          ...systemOption(`${DROP}${String(index)}`, '', 'Drop here'),
          role: 'drop',
          ordinal,
        };
        return inARoom ? [pick, drop] : [pick];
      }),
      { ...systemOption(CLOSE, 'b', 'Back to reality'), role: 'return' },
    ];
  }

  answer(optionId: string): Reply | undefined {
    if (!this.options().some((option) => option.id === optionId)) return undefined;
    if (optionId === CLOSE) return { message: '', done: true };
    if (optionId.startsWith(PICK))
      return { message: this.#pick(Number(optionId.slice(PICK.length))), done: false };
    const dropped = this.#journey.drop(Number(optionId.slice(DROP.length)));
    this.#selected = undefined;
    return { message: dropped === undefined ? '' : `Dropped ${dropped.name()} here.`, done: false };
  }

  /** The first pick selects, the same pick unselects, another pick merges (the selection first in the hybrid's name). */
  #pick(index: number): string {
    const selected = this.#selected;
    if (selected === undefined) {
      this.#selected = index;
      return '';
    }
    this.#selected = undefined;
    if (selected === index) return '';
    const merge = this.#journey.merge(selected, index);
    if (merge === undefined) return '';
    const { fragment } = merge;
    if (merge.forged) {
      return `Critical waveform collapse: KEYSTONE_STABILIZED. The fragments merge into a silent, heavy anchor: ${fragment.name()}. Coherence +15.`;
    }
    const resonance = fragment.resonant() ? ' Resonance detected.' : '';
    return `Synthesis complete: ${fragment.name()} (${String(fragment.frequency().hertz())} Hz). Coherence +15.${resonance}`;
  }
}
