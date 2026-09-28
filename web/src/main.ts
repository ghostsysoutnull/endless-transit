// Composition root: the only file that builds adapters and knows every layer.
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-700.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '#ui/styles/app.css';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { BUILDING_KIND } from '#engine/model/Building.ts';
import { CORRIDOR_KIND } from '#engine/model/Corridor.ts';
import { STREET_KIND } from '#engine/model/Street.ts';
import { LocationRegistry } from '#engine/procgen/LocationRegistry.ts';
import { ThemeCatalog } from '#engine/procgen/ThemeCatalog.ts';
import { GameEngine } from '#engine/rules/GameEngine.ts';
import { ConsoleWarningSink } from '#platform/ConsoleWarningSink.ts';
import { CryptoEntropySource } from '#platform/CryptoEntropySource.ts';
import { BrowserFrameSource } from '#platform/BrowserFrameSource.ts';
import { BrowserReducedMotion } from '#platform/BrowserReducedMotion.ts';
import { LocalStorageSaveStore } from '#platform/LocalStorageSaveStore.ts';
import { Masthead } from '#ui/Masthead.ts';
import { CanvasFont } from '#ui/canvas/CanvasFont.ts';
import { BonePanel } from '#ui/scene/BonePanel.ts';
import { ColdMark } from '#ui/scene/ColdMark.ts';
import { CorridorPicture } from '#ui/scene/CorridorPicture.ts';
import { CurvedHall } from '#ui/scene/CurvedHall.ts';
import { DoorLooks } from '#ui/scene/DoorLooks.ts';
import { EndingReach } from '#ui/scene/EndingReach.ts';
import { EndWall } from '#ui/scene/EndWall.ts';
import { FrostMark } from '#ui/scene/FrostMark.ts';
import { GlassPanel } from '#ui/scene/GlassPanel.ts';
import { LongHall } from '#ui/scene/LongHall.ts';
import { MetalPanel } from '#ui/scene/MetalPanel.ts';
import { MotionClock } from '#ui/scene/MotionClock.ts';
import { PlainMark } from '#ui/scene/PlainMark.ts';
import { PlainPanel } from '#ui/scene/PlainPanel.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';
import { ServiceHall } from '#ui/scene/ServiceHall.ts';
import { ShadowGlow } from '#ui/scene/ShadowGlow.ts';
import { StaticHall } from '#ui/scene/StaticHall.ts';
import { StaticMark } from '#ui/scene/StaticMark.ts';
import { StonePanel } from '#ui/scene/StonePanel.ts';
import { TimberPanel } from '#ui/scene/TimberPanel.ts';
import { SceneRegistry } from '#ui/scene/SceneRegistry.ts';
import { StreetPicture } from '#ui/scene/StreetPicture.ts';
import { TowerPicture } from '#ui/scene/TowerPicture.ts';
import { BufferPresenter } from '#ui/screens/BufferPresenter.ts';
import { BufferView } from '#ui/screens/BufferView.ts';
import { HelpPresenter } from '#ui/screens/HelpPresenter.ts';
import { HelpView } from '#ui/screens/HelpView.ts';
import { HudPresenter } from '#ui/screens/HudPresenter.ts';
import { HudView } from '#ui/screens/HudView.ts';
import { RebootPresenter } from '#ui/screens/RebootPresenter.ts';
import { RebootView } from '#ui/screens/RebootView.ts';
import { RecapPresenter } from '#ui/screens/RecapPresenter.ts';
import { RecapView } from '#ui/screens/RecapView.ts';
import { TitlePresenter } from '#ui/screens/TitlePresenter.ts';
import { TitleView } from '#ui/screens/TitleView.ts';
import { ScreenStage } from '#ui/ScreenStage.ts';
import { Shell } from '#ui/Shell.ts';

const container = document.querySelector<HTMLElement>('#app');
if (container === null) throw new Error('#app is missing from index.html');

const library = new ContentLibrary(new BundledContent());
// Debug mode (queue decision 8): `?debug` on the page's address puts the debug tools on offer; nowhere else.
const debug = new URLSearchParams(window.location.search).has('debug');
const engine = new GameEngine({
  world: new LocationRegistry(library, new ThemeCatalog(library), new ConsoleWarningSink()),
  entropy: new CryptoEntropySource(window.crypto),
  saves: new LocalStorageSaveStore(() => window.localStorage),
  debug,
});

const masthead = new Masthead(__ET_BUILD__);
// The page's one frame loop (Decision 4): every canvas that moves listens to it.
const clock = new MotionClock(new BrowserFrameSource(window));
// Whether the player asked for reduced motion: asked by every moving thing, read only here.
const motion = new BrowserReducedMotion(window);
// The places that are drawn (U01b): a drawing key the engine hands over, and its picture. A new scene is one entry.
// The corridor is handed every part it draws with (U02): a hall per shape, a panel per material, a mark per state.
const noise = new SceneHash();
const glow = new ShadowGlow();
const wall = new EndWall();
const reach = new EndingReach();
const long = new LongHall();
const scenes = new SceneRegistry({
  [STREET_KIND.key()]: new StreetPicture(),
  [BUILDING_KIND.key()]: new TowerPicture(),
  [CORRIDOR_KIND.key()]: new CorridorPicture({
    font: new CanvasFont(),
    inks: new DoorLooks(),
    glow,
    halls: {
      long,
      service: new ServiceHall(wall, reach),
      curved: new CurvedHall(wall, reach),
      static: new StaticHall(noise, reach),
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
      frost: new FrostMark(noise),
      cold: new ColdMark(glow),
      static: new StaticMark(),
      plain: new PlainMark(),
    },
  }),
});
new Shell(
  engine,
  [
    new ScreenStage(new RebootPresenter(masthead), new RebootView()),
    new ScreenStage(new RecapPresenter(masthead), new RecapView()),
    new ScreenStage(new BufferPresenter(masthead), new BufferView()),
    new ScreenStage(new HelpPresenter(masthead), new HelpView()),
    new ScreenStage(new TitlePresenter(masthead), new TitleView()),
    new ScreenStage(new HudPresenter(masthead), new HudView(clock, scenes, motion)),
  ],
  motion,
).start(container);
