import { html, nothing, type TemplateResult } from 'lit-html';
import type { KeyVM } from './KeyVM.ts';
import type { KeyStrip } from './KeyStrip.ts';
import type { KeyStripParts } from './KeyStripParts.ts';
import type { KeyStripVM } from './KeyStripVM.ts';

/**
 * Draws the strip of keys at the foot of a screen (U03e) — under a room's card, or in place of the dock — and owns one piece of state:
 * whether the MORE sheet, the game's own options, lies open. Each key is a real button for its option, its drawn icon
 * the stylesheet's; MORE is a view control: it picks nothing. Every word comes from the view-model.
 */
export class KeyStripView implements KeyStrip {
  #more = false;

  close(): void {
    this.#more = false;
  }

  strip(vm: KeyStripVM, parts: KeyStripParts): TemplateResult {
    return html`
      <nav class="keys" aria-label=${vm.regions.keys}>
        <button
          type="button"
          class="key"
          data-icon="more"
          data-testid="keys-more"
          aria-expanded=${this.#more ? 'true' : 'false'}
          aria-label=${vm.more.label}
          @click=${() => {
            this.#more = !this.#more;
            parts.repaint();
          }}
        >
          <span aria-hidden="true">${vm.more.text}</span>
        </button>
        ${vm.keys.lead.map((key) => this.#key(key, parts))} ${parts.slot}
        ${vm.keys.trail.map((key) => this.#key(key, parts))}
      </nav>
    `;
  }

  /** The MORE sheet: the game's own options as a second strip of keys; a tap on the veil above it closes it. */
  sheet(vm: KeyStripVM, parts: KeyStripParts): TemplateResult | typeof nothing {
    if (!this.#more) return nothing;
    return html`
      <div
        class="veil"
        @click=${() => {
          this.close();
          parts.repaint();
        }}
      ></div>
      <section class="more" aria-label=${vm.regions.game} data-spot>
        <nav class="keys" aria-label=${vm.regions.game}>${vm.game.map((key) => this.#key(key, parts))}</nav>
      </section>
    `;
  }

  /** One key of the strip: a real button for its option, its drawn icon the stylesheet's, its count beside it. */
  #key(key: KeyVM, parts: KeyStripParts): TemplateResult {
    return html`
      <button
        type="button"
        class="key"
        id=${key.anchor === '' ? nothing : key.anchor}
        data-option=${key.id}
        data-icon=${key.icon}
        ?data-lit=${parts.lit(key.id)}
        aria-label=${key.label}
      >
        ${key.badge === '' ? nothing : html`<b class="badge" aria-hidden="true">${key.badge}</b>`}<span
          aria-hidden="true"
          >${key.text}</span
        >
      </button>
    `;
  }
}
