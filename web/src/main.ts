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
import { LocalStorageSaveStore } from '#platform/LocalStorageSaveStore.ts';
import { BuildMasthead } from '#ui/BuildMasthead.ts';
import { CanvasFont } from '#ui/canvas/CanvasFont.ts';
import { CanvasMaker } from '#ui/canvas/CanvasMaker.ts';
import { CanvasViewMaker } from '#ui/canvas/CanvasViewMaker.ts';
import { MapPicture } from '#ui/canvas/MapPicture.ts';
import { TracePicture } from '#ui/canvas/TracePicture.ts';
import { Frame } from '#ui/Frame.ts';
import { MotionClock } from '#ui/scene/MotionClock.ts';
import { CoherenceFx } from '#ui/scene/CoherenceFx.ts';
import { EaseInOut } from '#ui/scene/EaseInOut.ts';
import { EaseOut } from '#ui/scene/EaseOut.ts';
import { PixelBudget } from '#ui/scene/PixelBudget.ts';
import { SceneCanvasMaker } from '#ui/scene/SceneCanvasMaker.ts';
import { SceneEvents } from '#ui/scene/SceneEvents.ts';
import { SceneRegistry } from '#ui/scene/SceneRegistry.ts';
import { SceneStage } from '#ui/scene/SceneStage.ts';
import { ScenePictures } from '#ui/scene/ScenePictures.ts';
import { SceneViewMaker } from '#ui/scene/SceneViewMaker.ts';
import { SliderMaker } from '#ui/scene/SliderMaker.ts';
import { TearPass } from '#ui/scene/TearPass.ts';
import { BufferPresenter } from '#ui/screens/BufferPresenter.ts';
import { BufferView } from '#ui/screens/BufferView.ts';
import { HelpPresenter } from '#ui/screens/HelpPresenter.ts';
import { HelpView } from '#ui/screens/HelpView.ts';
import { FloorPad } from '#ui/screens/FloorPad.ts';
import { FloorsByTen } from '#ui/screens/FloorsByTen.ts';
import { HudPresenter } from '#ui/screens/HudPresenter.ts';
import { LayersTogether } from '#ui/screens/LayersTogether.ts';
import { SceneDrawing } from '#ui/screens/SceneDrawing.ts';
import { HudView } from '#ui/screens/HudView.ts';
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
  { map: new MapPicture(font), trace: new TracePicture(font) },
  clock,
  motion,
  canvasMaker,
);
new Shell(
  engine,
  [
    new ScreenStage(new RebootPresenter(masthead), new RebootView()),
    new ScreenStage(new RecapPresenter(masthead, frame), new RecapView()),
    new ScreenStage(new BufferPresenter(masthead, frame), new BufferView()),
    new ScreenStage(new HelpPresenter(masthead, frame), new HelpView()),
    new ScreenStage(new TitlePresenter(masthead), new TitleView()),
    new ScreenStage(
      new HudPresenter(
        masthead,
        frame,
        new SceneDrawing(),
        new FloorPad({ floor: new FloorsByTen(), layer: new LayersTogether() }),
      ),
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
            new RelicFlight(document),
          ),
        ),
        canvases,
      ),
    ),
  ],
  motion,
).start(container);
