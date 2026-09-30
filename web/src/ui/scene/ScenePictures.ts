import { ApartmentGlyph } from './ApartmentGlyph.ts';
import { BuildingGlyph } from './BuildingGlyph.ts';
import { CityGlyph } from './CityGlyph.ts';
import { CorridorGlyph } from './CorridorGlyph.ts';
import { CountryGlyph } from './CountryGlyph.ts';
import { FilamentGlyph } from './FilamentGlyph.ts';
import { FloorGlyph } from './FloorGlyph.ts';
import { PlanetGlyph } from './PlanetGlyph.ts';
import { PolePicture } from './PolePicture.ts';
import { ReachGlyph } from './ReachGlyph.ts';
import { RoomGlyph } from './RoomGlyph.ts';
import { SectorGlyph } from './SectorGlyph.ts';
import { StreetGlyph } from './StreetGlyph.ts';
import { SystemGlyph } from './SystemGlyph.ts';
import { UniverseGlyph } from './UniverseGlyph.ts';
import { CanvasFont } from '#ui/canvas/CanvasFont.ts';
import { AreaInk } from './AreaInk.ts';
import { AreaPicture } from './AreaPicture.ts';
import { AreaSpots } from './AreaSpots.ts';
import { CityMark } from './CityMark.ts';
import { CityScene } from './CityScene.ts';
import { CountryScene } from './CountryScene.ts';
import { FilamentScene } from './FilamentScene.ts';
import { GlobeMark } from './GlobeMark.ts';
import { LaneMark } from './LaneMark.ts';
import { PlanetScene } from './PlanetScene.ts';
import { ReachScene } from './ReachScene.ts';
import { RegionMark } from './RegionMark.ts';
import { SectorScene } from './SectorScene.ts';
import { SpiralMark } from './SpiralMark.ts';
import { StarMark } from './StarMark.ts';
import { StrandMark } from './StrandMark.ts';
import { SystemScene } from './SystemScene.ts';
import { UniverseScene } from './UniverseScene.ts';
import { VoidMark } from './VoidMark.ts';
import { ArchWall } from './ArchWall.ts';
import { BeamLight } from './BeamLight.ts';
import { BlockWall } from './BlockWall.ts';
import { BonePanel } from './BonePanel.ts';
import { BoxRoof } from './BoxRoof.ts';
import { ColdMark } from './ColdMark.ts';
import { ColumnWall } from './ColumnWall.ts';
import { CorridorPicture } from './CorridorPicture.ts';
import { CurvedHall } from './CurvedHall.ts';
import { CurvedRow } from './CurvedRow.ts';
import { Diamond } from './Diamond.ts';
import { DoorLooks } from './DoorLooks.ts';
import { EndingReach } from './EndingReach.ts';
import { EndWall } from './EndWall.ts';
import { FrostMark } from './FrostMark.ts';
import { GlassPanel } from './GlassPanel.ts';
import { GlowLight } from './GlowLight.ts';
import { LampLight } from './LampLight.ts';
import { LatticeWall } from './LatticeWall.ts';
import { LongHall } from './LongHall.ts';
import { LongRow } from './LongRow.ts';
import { MastRoof } from './MastRoof.ts';
import { MetalPanel } from './MetalPanel.ts';
import { NoLight } from './NoLight.ts';
import { NoRoof } from './NoRoof.ts';
import { ParapetRoof } from './ParapetRoof.ts';
import { PeakRoof } from './PeakRoof.ts';
import { PlainMark } from './PlainMark.ts';
import { PlainPanel } from './PlainPanel.ts';
import { PlainWall } from './PlainWall.ts';
import { PlanLayout } from './PlanLayout.ts';
import { PlanPicture } from './PlanPicture.ts';
import { PlateWall } from './PlateWall.ts';
import { RibWall } from './RibWall.ts';
import { Roof } from './Roof.ts';
import { RoomInsides } from './RoomInsides.ts';
import { RoomWall } from './RoomWall.ts';
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

  /**
   * The apartment's plan (U03), its rooms laid out by the shared hash; the room you stand in drawn by its look
   * (U03b): a wall per culture, in the culture's ink, and a light per era — a key with none listed is plain.
   */
  /** The levels above the street (U04): a drawing a level and a mark a child kind, sharing one ink and one spread. */
  area(): AreaPicture {
    const ink = new AreaInk(this.#noise);
    const spread = new AreaSpots(this.#noise);
    return new AreaPicture({
      font: this.#font,
      ink,
      scenes: {
        universe: new UniverseScene(ink, spread),
        filament: new FilamentScene(ink, spread),
        sector: new SectorScene(ink, spread),
        'null-reach': new ReachScene(ink),
        'solar-system': new SystemScene(ink),
        planet: new PlanetScene(ink),
        country: new CountryScene(ink, spread),
        city: new CityScene(ink, spread),
      },
      marks: {
        filament: new StrandMark(ink),
        sector: new SpiralMark(ink),
        'null-reach': new VoidMark(),
        'solar-system': new StarMark(ink),
        planet: new GlobeMark(ink),
        country: new RegionMark(ink),
        city: new CityMark(ink),
        street: new LaneMark(ink),
      },
    });
  }

  /** The pole (U05): its glyphs, one a kind, drawn with the areas' ink. */
  pole(): PolePicture {
    const ink = new AreaInk(this.#noise);
    return new PolePicture({
      font: this.#font,
      ink,
      glyphs: {
        universe: new UniverseGlyph(ink),
        filament: new FilamentGlyph(ink),
        sector: new SectorGlyph(ink),
        'null-reach': new ReachGlyph(ink),
        system: new SystemGlyph(ink),
        planet: new PlanetGlyph(ink),
        country: new CountryGlyph(ink),
        city: new CityGlyph(ink),
        street: new StreetGlyph(),
        building: new BuildingGlyph(),
        floor: new FloorGlyph(ink),
        corridor: new CorridorGlyph(ink),
        apartment: new ApartmentGlyph(),
        room: new RoomGlyph(),
      },
    });
  }

  plan(): PlanPicture {
    const glow = new ShadowGlow();
    const lattice = new LatticeWall();
    const plates = new PlateWall();
    const arches = new ArchWall();
    const plain = new PlainWall();
    return new PlanPicture({
      layout: new PlanLayout(this.#noise),
      font: this.#font,
      diamond: new Diamond(),
      glow,
      insides: new RoomInsides({
        walls: {
          shogun: new RoomWall(lattice, 'ab'),
          neon: new RoomWall(lattice, 'mg'),
          rust: new RoomWall(plates, 'ab'),
          abyssal: new RoomWall(plates, 'rd'),
          gilded: new RoomWall(arches, 'yl'),
          baroque: new RoomWall(arches, 'mg'),
          zenith: new RoomWall(new ColumnWall(), 'wh'),
          monolith: new RoomWall(new BlockWall(), 'dim'),
          organic: new RoomWall(new RibWall(), 'cy'),
          void: new RoomWall(plain, 'wh'),
        },
        lights: {
          ancient: new LampLight('yl', glow),
          analog: new LampLight('ab', glow),
          industrial: new LampLight('wh', glow),
          abyssal: new LampLight('rd', glow),
          atomic: new GlowLight('cy', glow),
          digital: new GlowLight('bl', glow),
          future: new GlowLight('bc', glow),
          singularity: new BeamLight('wh'),
          entropic: new BeamLight('dim'),
        },
        plainWall: new RoomWall(plain, 'dim'),
        noLight: new NoLight(),
        noise: this.#noise,
      }),
    });
  }
}
