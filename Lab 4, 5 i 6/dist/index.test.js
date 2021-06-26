import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://127.0.0.1:5500/Lab%204,%205%20i%206/dist/index.html');
  await page.screenshot({ path: 'screen.png' });
  page.waitForSelector('body > div > div > div > input').then(() => {
    console.log("got it");
  })
 
  await page.waitFor(1500);
  await page.type('#title', 'Pierwsza notatka');
  await page.type('.inputContainer #content', 'Treść notatki');
  await page.$eval('.row-color-container #color', el => el.value = '#59a86e');

  await page.click('#formDiv #btnAdd');
  await page.waitFor(10000);

  await page.screenshot({ path: 'screen-after-wait.png' });
  await browser.close();
})();