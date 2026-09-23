import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { frameOf } from '#ui/Frame.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { HelpVM } from './HelpVM.ts';

/** The prompt this screen claims — the engine's stable key for it. */
const HELP = 'help';
const RETURN_MARK = '▲ ';

/**
 * Owns the words of the help screen (Guide:80-96, 108-126, 131-156; the old `help` printed one line, this
 * one says what every button does and how not to die). No DOM. The buttons are named as the screen
 * shows them; the keys are not repeated here — a button carries its own letter, and keys are a desktop
 * extra (Decision 1).
 */
export class HelpPresenter implements Presenter<HelpVM> {
  readonly #masthead: Masthead;

  constructor(masthead: Masthead) {
    this.#masthead = masthead;
  }

  accepts(snapshot: GameSnapshot): boolean {
    return snapshot.prompt?.id === HELP;
  }

  toViewModel(snapshot: GameSnapshot): HelpVM {
    if (snapshot.prompt?.id !== HELP) throw new Error('HelpPresenter needs the help prompt');
    const heading = '[OPERATOR_MANUAL]';
    const dock = snapshot.options
      .filter((option) => option.role === 'return')
      .map((option) => this.#docked(option));
    return {
      scene: HELP,
      title: this.#masthead.name(),
      frame: frameOf(snapshot.place),
      heading,
      lead: 'You are a traveller in an endless lattice of places. Every tap is a prompt; every prompt costs Coherence. Go deep, take what resonates, and come back before the link fails.',
      sections: [
        {
          heading: 'MOVING',
          entries: [
            { term: 'A listed place', what: 'Tap it to enter. The list is what lies one level down.' },
            { term: '▲ LEAVE', what: 'Back up one level, to the place you came from.' },
            {
              term: 'GO UP · GO DOWN',
              what: 'Ride a building’s elevator one floor. The top and the ground floor drop one of them.',
            },
            {
              term: 'ENTER CORRIDOR · BACK TO ELEVATOR',
              what: 'The corridor lists the floor’s doors; a door opens an apartment’s first room.',
            },
            {
              term: 'GO FORWARD · GO BACK',
              what: 'Walk an apartment’s rooms. Only the first room has EXIT APARTMENT.',
            },
            {
              term: 'An object',
              what: 'Tap one in a room to take it into the buffer. Sixteen fit; the tiles stop being buttons when it is full.',
            },
          ],
        },
        {
          heading: 'THE DOCK',
          entries: [
            {
              term: 'SCAN',
              what: 'What is behind the doors, which floors are near you, or the rooms of the apartment. Costs 1, no step.',
            },
            {
              term: 'MAP',
              what: 'Draws the places you can enter from here, you at the centre; dim is unvisited. Nothing inside a room. Costs 1.',
            },
            {
              term: 'BUFFER',
              what: 'Your inventory. Select one fragment, then another: they merge into a hybrid and give 15 Coherence back. In a room, drop one where you stand. Costs 1 to open; nothing inside.',
            },
            { term: 'TRACE', what: 'Your whole path from the universe down to here. Costs 1.' },
            { term: 'HELP', what: 'This screen. Costs 1.' },
            { term: 'TITLE SCREEN', what: 'Back to the title; the world waits behind CONTINUE. Costs 1.' },
            {
              term: 'END SESSION',
              what: 'The recap of this run: where you are, your steps, your places, your buffer. RESUME comes back; ending it goes to the title with the place kept.',
            },
            { term: 'MORE', what: 'On a phone, the rest of the dock. It folds again after the next tap.' },
          ],
        },
      ],
      survival: {
        heading: 'HOW NOT TO DIE',
        lines: [
          'Every tap costs 1 Coherence before anything else happens — a move, a scan, the buffer. A place whose era is entropic costs 2, anywhere below a building’s bedrock costs 2, both at once 4.',
          'Only a merge gives it back: 15, capped at 100. Nothing else does.',
          'Under 40 the room text starts to corrupt. Under 30 the bar is red and the map sprouts X marks, more as you drop.',
          'At 0 the link fails: the world is rebuilt from the same seed and you wake on the starting street with 100. You keep your buffer, your step count and your visited places; everything that lived inside the world is undone.',
          'A capture whose frequency is a multiple of 11 resonates and counts on your tally, once. A Keystone never does.',
        ],
      },
      keys: 'On a keyboard, the letter on a button is its key. A phone needs none.',
      dock,
      options: dock,
      note: snapshot.message,
      // The engine says nothing when the screen opens; the live region is told the heading, once.
      status: snapshot.message === '' ? heading : snapshot.message,
      build: this.#masthead.buildLine(),
      regions: { help: 'Help', actions: 'Back' },
    };
  }

  #docked(option: { id: string; key: string; label: string; opposite: string }): OptionVM {
    return {
      id: option.id,
      key: option.key.toUpperCase(),
      label: `${RETURN_MARK}${option.label.toUpperCase()}`,
      opposite: option.opposite,
    };
  }
}
