const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/kristiankarban/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const output = path.join(__dirname, 'nahledy');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  await desktop.addInitScript(() => localStorage.setItem('cookie-consent', 'rejected'));
  await desktop.goto('http://127.0.0.1:3010/prostor-demo', { waitUntil: 'networkidle' });
  await desktop.evaluate(() => document.fonts.ready);
  await desktop.screenshot({ path: path.join(output, 'desktop-odemceno.png'), fullPage: true });
  await desktop.getByRole('button', { name: 'Ukázat stav před nákupem' }).click();
  await desktop.screenshot({ path: path.join(output, 'desktop-zamceno.png'), fullPage: true });
  await desktop.getByRole('button', { name: 'Simulovat potvrzenou platbu', exact: true }).first().click();
  await desktop.getByRole('button', { name: 'Zapsat dnešní stav', exact: true }).click();
  await desktop.getByRole('dialog', { name: 'Dnešní check in' }).waitFor();
  await desktop.screenshot({ path: path.join(output, 'desktop-check-in.png'), fullPage: true });
  await desktop.getByRole('button', { name: 'Zavřít' }).click();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await mobile.addInitScript(() => localStorage.setItem('cookie-consent', 'rejected'));
  await mobile.goto('http://127.0.0.1:3010/prostor-demo', { waitUntil: 'networkidle' });
  await mobile.evaluate(() => document.fonts.ready);
  await mobile.screenshot({ path: path.join(output, 'mobil-odemceno.png'), fullPage: true });

  const geometry = await mobile.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    clientHeight: document.documentElement.clientHeight,
    scrollHeight: document.documentElement.scrollHeight,
  }));
  await browser.close();
  if (geometry.scrollWidth > geometry.clientWidth) {
    throw new Error(`Mobilní layout přetéká vodorovně: ${JSON.stringify(geometry)}`);
  }
  process.stdout.write(`KONTROLA PROŠLA: ${JSON.stringify(geometry)}\n`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
