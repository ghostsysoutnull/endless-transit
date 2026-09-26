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
import { LocalStorageSaveStore } from '#platform/LocalStorageSaveStore.ts';
import { Masthead } from '#ui/Masthead.ts';
import { MotionClock } from '#ui/scene/MotionClock.ts';
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
new Shell(engine, [
  new ScreenStage(new RebootPresenter(masthead), new RebootView()),
  new ScreenStage(new RecapPresenter(masthead), new RecapView()),
  new ScreenStage(new BufferPresenter(masthead), new BufferView()),
  new ScreenStage(new HelpPresenter(masthead), new HelpView()),
  new ScreenStage(new TitlePresenter(masthead), new TitleView()),
  new ScreenStage(new HudPresenter(masthead), new HudView(clock)),
]).start(container);
