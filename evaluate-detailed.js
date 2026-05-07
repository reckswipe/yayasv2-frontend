const { chromium } = require('playwright');

const CHECKS = {
  noConsoleErrors: { weight: 20, check: async (page) => {
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    await page.waitForTimeout(1500);
    return errors.length === 0 ? { pass: true, detail: 'No console errors' } : { pass: false, detail: `Errors: ${errors.slice(0,2).join(', ')}` };
  }},
  
  pageLoads: { weight: 10, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'domcontentloaded', timeout: 30000});
    const title = await page.title();
    return title.includes('YAYAS') ? { pass: true, detail: `Title: ${title}` } : { pass: false, detail: `Wrong title: ${title}` };
  }},

  heroSection: { weight: 10, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const hero = await page.$('section');
    const h1 = await page.$('h1');
    return (hero && h1) ? { pass: true, detail: 'Hero with h1 present' } : { pass: false, detail: 'Missing hero or h1' };
  }},

  headerPresent: { weight: 5, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const header = await page.$('header');
    return header ? { pass: true, detail: 'Header present' } : { pass: false, detail: 'No header found' };
  }},

  footerPresent: { weight: 5, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const footer = await page.$('footer');
    return footer ? { pass: true, detail: 'Footer present' } : { pass: false, detail: 'No footer found' };
  }},

  voidBackground: { weight: 10, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const bg = await page.$eval('body', el => getComputedStyle(el).backgroundColor);
    return bg === 'rgb(5, 5, 5)' ? { pass: true, detail: 'Void #050505 background' } : { pass: false, detail: `Wrong bg: ${bg}` };
  }},

  goldAccents: { weight: 10, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const goldEls = await page.$$('[class*="gold"]');
    return goldEls.length > 5 ? { pass: true, detail: `${goldEls.length} gold elements` } : { pass: false, detail: 'Not enough gold elements' };
  }},

  productCards: { weight: 10, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const products = await page.$$('a[href*="/products/"]');
    return products.length >= 3 ? { pass: true, detail: `${products.length} product cards` } : { pass: false, detail: `Only ${products.length} products` };
  }},

  newsletterForm: { weight: 5, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const form = await page.$('form input[type="email"]');
    return form ? { pass: true, detail: 'Newsletter form present' } : { pass: false, detail: 'No newsletter form' };
  }},

  loadTime: { weight: 5, check: async (page) => {
    const start = Date.now();
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const time = (Date.now() - start) / 1000;
    return time < 3 ? { pass: true, detail: `Load: ${time.toFixed(1)}s` } : { pass: false, detail: `Slow load: ${time.toFixed(1)}s` };
  }},

  imagesLoad: { weight: 5, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const imgs = await page.$$('img');
    let broken = 0;
    for (const img of imgs) {
      const ok = await img.evaluate(el => el.complete && el.naturalHeight > 0);
      if (!ok) broken++;
    }
    return broken === 0 ? { pass: true, detail: `All ${imgs.length} images loaded` } : { pass: false, detail: `${broken} broken images` };
  }},

  mobileResponsive: { weight: 5, check: async (page) => {
    await page.setViewportSize({width: 375, height: 812});
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    await page.waitForTimeout(500);
    // Check if any scrolling content actually overflows past viewport (not clipped by overflow: hidden)
    const hasOverflow = await page.evaluate(() => {
      // Check each element - if it extends past viewport AND is not clipped by overflow:hidden ancestor
      const elements = Array.from(document.querySelectorAll('*'));
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.width <= 0) continue;
        if (rect.right <= window.innerWidth) continue;
        
        // Check if this element or any ancestor clips it
        let node = el;
        let isClipped = false;
        while (node && node !== document.documentElement) {
          const style = getComputedStyle(node);
          const overflowX = style.overflowX;
          if ((overflowX === 'hidden' || overflowX === 'clip') && node !== document.body) {
            isClipped = true;
            break;
          }
          // Also check position: fixed doesn't count as overflow
          if (style.position === 'fixed' || style.position === 'absolute') {
            isClipped = true;
            break;
          }
          node = node.parentElement;
        }
        if (!isClipped) return true; // Found truly overflowing element
      }
      return false;
    });
    return !hasOverflow ? { pass: true, detail: 'No horizontal scroll on mobile' } : { pass: false, detail: 'Horizontal scroll detected' };
  }},

  buttonsAccessible: { weight: 5, check: async (page) => {
    await page.goto('http://localhost:3001', {waitUntil: 'networkidle', timeout: 30000});
    const badButtons = await page.$$eval('button', btns => 
      btns.filter(b => !b.getAttribute('aria-label') && !b.textContent.trim()).length
    );
    return badButtons === 0 ? { pass: true, detail: 'All buttons accessible' } : { pass: false, detail: `${badButtons} buttons lack labels` };
  }},
};

async function evaluate() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const results = [];
  let score = 0;
  let maxScore = 0;

  for (const [name, check] of Object.entries(CHECKS)) {
    try {
      const result = await check.check(page);
      results.push({ name, ...result, weight: check.weight });
      if (result.pass) score += check.weight;
      maxScore += check.weight;
    } catch (e) {
      results.push({ name, pass: false, detail: `Error: ${e.message}`, weight: check.weight });
      maxScore += check.weight;
    }
  }

  await browser.close();

  const percentage = Math.round((score / maxScore) * 100);
  
  console.log(`\n=== YAYAS SITE EVALUATION: ${percentage}/100 ===\n`);
  
  console.log('✓ PASSED:');
  results.filter(r => r.pass).forEach(r => console.log(`  [${r.weight}pts] ${r.name}: ${r.detail}`));
  
  console.log('\n✗ FAILED:');
  results.filter(r => !r.pass).forEach(r => console.log(`  [${r.weight}pts] ${r.name}: ${r.detail}`));
  
  console.log('\nJSON:', JSON.stringify({ score: percentage, results }, null, 2));
  
  return percentage;
}

evaluate().then(pct => process.exit(pct >= 95 ? 0 : 1));
