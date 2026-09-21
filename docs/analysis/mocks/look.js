// Look at a mock in a real browser: prints page errors, takes real-time screenshots.
// usage: node look.js <file.html> <final.png> '[{"key":"Enter","wait":900},{"key":"Shift+L","wait":3000,"shot":"trace.png"}]'
// Needs a playwright-core module and a Chromium on disk; override the defaults with PW_CORE and CHROME.
// Explained in docs/analysis/WEB_PORT_CONCEPT.md section 4. Not game code.
const path = require('path'), fs = require('fs'), home = process.env.HOME;
const core = process.env.PW_CORE || path.join(home, '.cache/lonestar-verify/node_modules/playwright-core');
const cacheDir = path.join(home, '.cache/ms-playwright');
const chrome = process.env.CHROME || (fs.existsSync(cacheDir) ? fs.readdirSync(cacheDir).filter(d => /^chromium-\d+$/.test(d)).map(d => path.join(cacheDir, d, 'chrome-linux64/chrome')).filter(fs.existsSync)[0] : null);
if (!fs.existsSync(core) || !chrome){ console.error('No playwright-core at ' + core + ' or no Chromium under ' + cacheDir + '. Set PW_CORE and CHROME.'); process.exit(2); }
const [file, finalShot, stepsJson] = process.argv.slice(2);
if (!file){ console.error('usage: node look.js <file.html> [final.png] [steps-json]'); process.exit(2); }
(async () => {
  const { chromium } = require(core);
  const browser = await chromium.launch({ executablePath: chrome, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: +(process.env.W || 1360), height: +(process.env.H || 940) } });
  const errs = [];
  page.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
  await page.goto('file://' + path.resolve(file));
  await page.waitForTimeout(900);
  for (const s of JSON.parse(stepsJson || '[]')){
    if (s.key) await page.keyboard.press(s.key);
    if (s.click) await page.click(s.click);
    if (s.wait) await page.waitForTimeout(s.wait);
    if (s.shot) await page.screenshot({ path: s.shot });
  }
  if (finalShot) await page.screenshot({ path: finalShot });
  console.log(errs.length ? errs.join('\n') : 'NO PAGE ERRORS');
  await browser.close();
})();
