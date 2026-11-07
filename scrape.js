const playwright = require('C:/Users/danie/OneDrive/Escritorio/job-seeker/node_modules/playwright');
const fs = require('fs');

(async () => {
  const context = await playwright.chromium.launchPersistentContext('C:/Users/danie/OneDrive/Escritorio/FunnelMaster/.browser-profile', {
    executablePath: 'C:/Users/danie/AppData/Local/ms-playwright/chromium-1254/chrome-win64/chrome.exe',
    headless: false
  });
  const page = context.pages()[0] || await context.newPage();
  console.log('Navigating to Notion...');
  await page.goto('https://melodic-study-6e1.notion.site/Activa-tus-ventas-en-48hrs-23cc1e7a765480edb5bbe959fa3c4d8e');

  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(2000);
    const title = await page.title().catch(() => '');
    console.log(`Step ${i}: ${title}`);

    try {
      const proceed = page.getByText(/Proceed anyway|Continuar|Aceptar/i);
      if (await proceed.isVisible().catch(() => false)) {
        console.log('Clicking proceed button...');
        await proceed.click().catch(() => {});
      }
    } catch (e) {}

    const text = await page.evaluate(() => document.body.innerText).catch(() => '');
    if (text.length > 200 && !title.includes('Un momento') && !title.includes('Flagged Content')) {
      console.log('Successfully captured Notion content! Length:', text.length);
      fs.writeFileSync('notion_full.txt', text, 'utf8');
      break;
    }
  }

  const finalText = await page.evaluate(() => document.body.innerText).catch(() => '');
  fs.writeFileSync('notion_full.txt', finalText, 'utf8');
  await page.screenshot({ path: 'notion_latest.png' }).catch(() => {});
  await context.close();
  console.log('Finished scrape.');
})();
