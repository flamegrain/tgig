const puppeteer = require('puppeteer-core');
const path = require('path');

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080, deviceScaleFactor: 2 });
  
  console.log('Navigating to live site...');
  await page.goto('https://tgig-lovat.vercel.app', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait 4 seconds for Leaflet map tiles, MBTA polyline rendering, and icons
  await new Promise(r => setTimeout(r, 4000));
  
  // Capture full page screenshot
  const outPath = path.resolve(__dirname, '../assets/preview.png');
  await page.screenshot({
    path: outPath,
    fullPage: true,
  });
  
  console.log('Screenshot saved to:', outPath);
  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
