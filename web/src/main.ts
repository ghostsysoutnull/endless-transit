// Composition root: the only file that builds adapters and knows every layer.
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-700.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '#ui/styles/app.css';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { LocationRegistry } from '#engine/procgen/LocationRegistry.ts';
import { ThemeCatalog } from '#engine/procgen/ThemeCatalog.ts';
import { GameEngine } from '#engine/rules/GameEngine.ts';
import { ConsoleWarningSink } from '#platform/ConsoleWarningSink.ts';
import { CryptoEntropySource } from '#platform/CryptoEntropySource.ts';
import { BrowserFrameSource } from '#platform/BrowserFrameSource.ts';
import { BrowserReducedMotion } from '#platform/BrowserReducedMotion.ts';
import { LocalStorageTraceViewMemory } from '#platform/LocalStorageTraceViewMemory.ts';
import { LocalStorageSaveStore } from '#platform/LocalStorageSaveStore.ts';
import { BuildMasthead } from '#ui/BuildMasthead.ts';
import { CanvasFont } from '#ui/canvas/CanvasFont.ts';
import { CanvasMaker } from '#ui/canvas/CanvasMaker.ts';
import { CanvasViewMaker } from '#ui/canvas/CanvasViewMaker.ts';
import { MapPicture } from '#ui/canvas/MapPicture.ts';
import { SpectrumPicture } from '#ui/canvas/SpectrumPicture.ts';
import { Frame } from '#ui/Frame.ts';
import { MotionClock } from '#ui/scene/MotionClock.ts';
import { CoherenceFx } from '#ui/scene/CoherenceFx.ts';
import { EaseInOut } from '#ui/scene/EaseInOut.ts';
import { EaseOut } from '#ui/scene/EaseOut.ts';
import { PixelBudget } from '#ui/scene/PixelBudget.ts';
import { SceneCanvasMaker } from '#ui/scene/SceneCanvasMaker.ts';
import { SceneEvents } from '#ui/scene/SceneEvents.ts';
import { DepthRail } from '#ui/scene/DepthRail.ts';
import { Dive } from '#ui/scene/Dive.ts';
import { LiveBand } from '#ui/scene/LiveBand.ts';
import { NoTear } from '#ui/scene/NoTear.ts';
import { TraceBands } from '#ui/scene/TraceBands.ts';
import { TracePole } from '#ui/scene/TracePole.ts';
import { SceneRegistry } from '#ui/scene/SceneRegistry.ts';
import { SceneStage } from '#ui/scene/SceneStage.ts';
import { ScenePictures } from '#ui/scene/ScenePictures.ts';
import { SceneViewMaker } from '#ui/scene/SceneViewMaker.ts';
import { SliderMaker } from '#ui/scene/SliderMaker.ts';
import { TearPass } from '#ui/scene/TearPass.ts';
import { TitleScene } from '#ui/scene/TitleScene.ts';
import { BufferPresenter } from '#ui/screens/BufferPresenter.ts';
import { BufferView } from '#ui/screens/BufferView.ts';
import { HelpPresenter } from '#ui/screens/HelpPresenter.ts';
import { HelpView } from '#ui/screens/HelpView.ts';
import { Passage } from '#ui/screens/Passage.ts';
import { PassageLevels } from '#ui/screens/PassageLevels.ts';
import { PolePresenter } from '#ui/screens/PolePresenter.ts';
import { HudPresenter } from '#ui/screens/HudPresenter.ts';
import { SceneDrawing } from '#ui/screens/SceneDrawing.ts';
import { HudView } from '#ui/screens/HudView.ts';
import { KeyStripView } from '#ui/screens/KeyStripView.ts';
import { RoomCardView } from '#ui/screens/RoomCardView.ts';
import { StripSlot } from '#ui/screens/StripSlot.ts';
import { CardTurns } from '#ui/card/CardTurns.ts';
import { BlindsTurn } from '#ui/card/BlindsTurn.ts';
import { DoorTurn } from '#ui/card/DoorTurn.ts';
import { FlipTurn } from '#ui/card/FlipTurn.ts';
import { PeelTurn } from '#ui/card/PeelTurn.ts';
import { StaticTurn } from '#ui/card/StaticTurn.ts';
import { TornTurn } from '#ui/card/TornTurn.ts';
import { InstantTurn } from '#ui/card/InstantTurn.ts';
import { RebootPresenter } from '#ui/screens/RebootPresenter.ts';
import { RebootView } from '#ui/screens/RebootView.ts';
import { RecapPresenter } from '#ui/screens/RecapPresenter.ts';
import { RecapView } from '#ui/screens/RecapView.ts';
import { TitlePresenter } from '#ui/screens/TitlePresenter.ts';
import { TitleView } from '#ui/screens/TitleView.ts';
import { RelicFlight } from '#ui/RelicFlight.ts';
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

const masthead = new BuildMasthead(__ET_BUILD__);
const frame = new Frame();
// The page's one frame loop (Decision 4): every canvas that moves listens to it.
const clock = new MotionClock(new BrowserFrameSource(window));
// Whether the player asked for reduced motion: asked by every moving thing, read only here.
const motion = new BrowserReducedMotion(window);
// The places that are drawn (U01b): a picture per drawn kind the engine's portraits name. A new kind is one more.
const pictures = new ScenePictures();
const scenes = new SceneRegistry({
  street: pictures.street(),
  tower: pictures.tower(),
  corridor: pictures.corridor(),
  plan: pictures.plan(),
  area: pictures.area(),
});
// The world screen's canvases: the map and the trace, drawn in the pictures' one font (U02).
const font = new CanvasFont();
// Every canvas on the page's one pixel budget (Decision 4).
const canvasMaker = new CanvasMaker(new PixelBudget());
const canvases = new CanvasViewMaker(
  { map: new MapPicture(font), spectrum: new SpectrumPicture() },
  clock,
  motion,
  canvasMaker,
);
// How long each level holds on the way into the game and on the way out of it, in milliseconds: long enough to read.
const PASSAGE = 1000;
// The strip of keys at the world screen's foot: one, drawn by the room's card or by the screen itself.
const keys = new KeyStripView();
new Shell(
  engine,
  [
    new ScreenStage(new RebootPresenter(masthead), new RebootView()),
    new ScreenStage(
      new RecapPresenter(masthead, frame, new PassageLevels(new SceneDrawing())),
      new RecapView({
        book: scenes,
        scene: new LiveBand({ canvases: canvasMaker, clock, motion, tear: new TearPass(new CoherenceFx()) }),
        // The way out of the game: the title's dive rewound, at its pace, torn as coherence has fallen.
        passage: new Passage({
          dive: new Dive({
            canvases: canvasMaker,
            clock,
            motion,
            tear: new TearPass(new CoherenceFx()),
            hold: PASSAGE,
          }),
          book: scenes,
        }),
        picks: new SceneEvents(),
      }),
    ),
    new ScreenStage(new BufferPresenter(masthead, frame), new BufferView()),
    new ScreenStage(new HelpPresenter(masthead, frame), new HelpView()),
    new ScreenStage(
      new TitlePresenter(masthead, new PassageLevels(new SceneDrawing())),
      new TitleView({
        book: scenes,
        scene: new TitleScene({ canvases: canvasMaker, clock, motion, tear: new TearPass(new CoherenceFx()) }),
        // The way into the game, taken at every start.
        passage: new Passage({
          dive: new Dive({ canvases: canvasMaker, clock, motion, tear: new NoTear(), hold: PASSAGE }),
          book: scenes,
        }),
        picks: new SceneEvents(),
      }),
    ),
    new ScreenStage(
      new HudPresenter(masthead, frame, new SceneDrawing(), new PolePresenter()),
      new HudView(
        scenes,
        new SceneStage(
          new SceneViewMaker(
            {
              clock,
              motion,
              canvases: new SceneCanvasMaker({
                canvases: canvasMaker,
                tear: new TearPass(new CoherenceFx()),
              }),
              sliders: new SliderMaker(),
              picks: new SceneEvents(),
              ride: new EaseInOut(),
              coast: new EaseOut(),
            },
            { flight: new RelicFlight(document, motion), keys: new StripSlot() },
          ),
        ),
        canvases,
        {
          bands: new TraceBands({ canvases: canvasMaker, clock, motion }),
          dive: new Dive({ canvases: canvasMaker, clock, motion, tear: new NoTear(), hold: 750 }),
          pole: new TracePole({ canvases: canvasMaker, clock, motion, picture: pictures.pole() }),
          // The trace's view the player picked last (U05): kept in the browser like the save.
          views: new LocalStorageTraceViewMemory(() => window.localStorage),
        },
        new RoomCardView({
          motion,
          turns: new CardTurns({
            clean: [new FlipTurn(), new DoorTurn(), new PeelTurn(), new BlindsTurn()],
            broken: [new StaticTurn(), new TornTurn()],
            still: new InstantTurn(),
          }),
          keys,
        }),
        keys,
        // The depth rail: the levels' marks are the pole's own glyphs.
        new DepthRail({ canvases: canvasMaker, clock, motion, glyphs: pictures.glyphs() }),
      ),
    ),
  ],
  motion,
).start(container);
