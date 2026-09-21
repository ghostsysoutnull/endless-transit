// Composition root: the only file that builds adapters and knows every layer.
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-700.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '#ui/styles/app.css';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { UniverseNamer } from '#engine/procgen/UniverseNamer.ts';
import { GameEngine } from '#engine/rules/GameEngine.ts';
import { CryptoEntropySource } from '#platform/CryptoEntropySource.ts';
import { LocalStorageSaveStore } from '#platform/LocalStorageSaveStore.ts';
import { TitlePresenter } from '#ui/screens/TitlePresenter.ts';
import { TitleView } from '#ui/screens/TitleView.ts';
import { Shell } from '#ui/Shell.ts';

const container = document.querySelector<HTMLElement>('#app');
if (container === null) throw new Error('#app is missing from index.html');

const engine = new GameEngine({
  namer: new UniverseNamer(new ContentLibrary(new BundledContent())),
  entropy: new CryptoEntropySource(window.crypto),
  saves: new LocalStorageSaveStore(() => window.localStorage),
});
const presenter = new TitlePresenter();

new Shell(engine, (snapshot) => presenter.toViewModel(snapshot), new TitleView()).start(container);
