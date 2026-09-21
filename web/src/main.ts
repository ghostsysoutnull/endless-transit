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
import { CryptoEntropySource } from '#platform/CryptoEntropySource.ts';
import { LocalStorageSaveStore } from '#platform/LocalStorageSaveStore.ts';
import { TitlePresenter } from '#ui/screens/TitlePresenter.ts';
import { TitleView } from '#ui/screens/TitleView.ts';
import { Shell } from '#ui/Shell.ts';

const container = document.querySelector<HTMLElement>('#app');
if (container === null) throw new Error('#app is missing from index.html');

const library = new ContentLibrary(new BundledContent());
const engine = new GameEngine({
  world: new LocationRegistry(library, new ThemeCatalog(library)),
  entropy: new CryptoEntropySource(window.crypto),
  saves: new LocalStorageSaveStore(() => window.localStorage),
});
const presenter = new TitlePresenter(__ET_BUILD__);

new Shell(engine, (snapshot) => presenter.toViewModel(snapshot), new TitleView()).start(container);
