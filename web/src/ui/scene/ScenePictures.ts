import { CanvasFont } from '#ui/canvas/CanvasFont.ts';
import { BonePanel } from './BonePanel.ts';
import { BoxRoof } from './BoxRoof.ts';
import { ColdMark } from './ColdMark.ts';
import { CorridorPicture } from './CorridorPicture.ts';
import { CurvedHall } from './CurvedHall.ts';
import { CurvedRow } from './CurvedRow.ts';
import { DoorLooks } from './DoorLooks.ts';
import { EndingReach } from './EndingReach.ts';
import { EndWall } from './EndWall.ts';
import { FrostMark } from './FrostMark.ts';
import { GlassPanel } from './GlassPanel.ts';
import { LongHall } from './LongHall.ts';
import { LongRow } from './LongRow.ts';
import { MastRoof } from './MastRoof.ts';
import { MetalPanel } from './MetalPanel.ts';
import { NoRoof } from './NoRoof.ts';
import { ParapetRoof } from './ParapetRoof.ts';
import { PeakRoof } from './PeakRoof.ts';
import { PlainMark } from './PlainMark.ts';
import { PlainPanel } from './PlainPanel.ts';
import { Roof } from './Roof.ts';
import { SceneHash } from './SceneHash.ts';
import { ServiceHall } from './ServiceHall.ts';
import { ServiceRow } from './ServiceRow.ts';
import { ShadowGlow } from './ShadowGlow.ts';
import { ShortReach } from './ShortReach.ts';
import { StaticHall } from './StaticHall.ts';
import { StaticMark } from './StaticMark.ts';
import { StaticRow } from './StaticRow.ts';
import { StonePanel } from './StonePanel.ts';
import { StreetPicture } from './StreetPicture.ts';
import { TimberPanel } from './TimberPanel.ts';
import { TowerPicture } from './TowerPicture.ts';

/**
 * The composition root's scene part (U02): builds each place's picture with every part it draws with, the parts the
 * pictures share (the hash, the font, the roofs, the door inks) built once. `main.ts` registers what it makes, and a
 * test builds a real picture the same way. It builds, and holds no rule of its own: the one place allowed to.
 */
export class ScenePictures {
  readonly #noise = new SceneHash();
  readonly #font = new CanvasFont();
  readonly #roofs = new Roof(this.#noise);
  readonly #inks = new DoorLooks();

  street(): StreetPicture {
    return new StreetPicture({
      font: this.#font,
      noise: this.#noise,
      roofs: this.#roofs,
      // Each roof at the street's proportions (the mock's, `transit-reframed.html:749`); a flat roof draws nothing.
      roofDrawers: {
        peak: new PeakRoof({ from: 0.2, to: 0.8, lift: 1, ceiling: -Infinity }),
        mast: new MastRoof({ at: 0.7, lift: 0.7 }),
        box: new BoxRoof({ from: 0.25, to: 0.75, lift: 0.4 }),
        flat: new NoRoof(),
      },
    });
  }

  tower(): TowerPicture {
    const short = new ShortReach();
    return new TowerPicture({
      font: this.#font,
      noise: this.#noise,
      roofs: this.#roofs,
      inks: this.#inks,
      // How each corridor shape runs on a floor's row; a row without a shape (a Layer's) is the plain line.
      rows: {
        long: new LongRow(),
        service: new ServiceRow(short),
        curved: new CurvedRow(),
        static: new StaticRow(short),
        none: new LongRow(),
      },
      // Each roof at the tower's proportions (the mock's, `transit-reframed.html:775`), the peak kept below the top.
      roofDrawers: {
        peak: new PeakRoof({ from: -0.18, to: 0.18, lift: 1.6, ceiling: 4 }),
        mast: new MastRoof({ at: 0.2, lift: 1 }),
        box: new BoxRoof({ from: -0.15, to: 0.15, lift: 0.5 }),
        flat: new ParapetRoof(),
      },
    });
  }

  /** The corridor is handed every part it draws with (U02): a hall per shape, a panel per material, a mark per state. */
  corridor(): CorridorPicture {
    const glow = new ShadowGlow();
    const wall = new EndWall();
    const reach = new EndingReach();
    const long = new LongHall();
    return new CorridorPicture({
      font: this.#font,
      inks: this.#inks,
      glow,
      halls: {
        long,
        service: new ServiceHall(wall, reach),
        curved: new CurvedHall(wall, reach),
        static: new StaticHall(this.#noise, reach),
        none: long,
      },
      panels: {
        glass: new GlassPanel(),
        metal: new MetalPanel(),
        stone: new StonePanel(),
        timber: new TimberPanel(),
        bone: new BonePanel(),
        plain: new PlainPanel(),
      },
      marks: {
        frost: new FrostMark(this.#noise),
        cold: new ColdMark(glow),
        static: new StaticMark(),
        plain: new PlainMark(),
      },
    });
  }
}
