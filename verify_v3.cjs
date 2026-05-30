const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  // Start dev server in background
  const { exec } = require('child_process');
  const server = exec('npm run dev');

  // Wait for server
  await new Promise(r => setTimeout(r, 5000));

  try {
    await page.goto('http://localhost:5173');
    await page.screenshot({ path: 'home_v3.png' });
    console.log('Home screenshot saved');

    await page.goto('http://localhost:5173/gallery');
    await page.screenshot({ path: 'gallery_v3.png' });
    console.log('Gallery screenshot saved');

    await page.goto('http://localhost:5173/login');
    await page.screenshot({ path: 'login_v3.png' });
    console.log('Login screenshot saved');
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
    server.kill();
  }
})();
