import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 30 });
  const page = await browser.newPage();

  await page.goto('https://workflow.wsei.edu.pl');
  await page.screenshot({ path: 'screen.png' });
  await page.waitForSelector('#mat-input-0');
  await page.type('#mat-input-0', 'user');
  await page.type('#mat-input-1', 'password');

  await page.waitFor(2000);
  await page.screenshot({ path: 'screen-after-wait.png' });
  await browser.close();
})();