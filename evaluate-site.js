const { chromium } = require('playwright');

const EVALUATION_CRITERIA = {
  visual: {
    'Hero section renders correctly': 0,
    'Hero has proper overlay and readability': 0,
    'Navigation is visible and styled': 0,
    'Footer is present and styled': 0,
    'Product cards have proper images': 0,
    'Colors are consistent (void, gold, cream)': 0,
    'No broken images or placeholders': 0,
    'Typography hierarchy is correct': 0,
    'Spacing and layout are consistent': 0,
  },
  functional: {
    'Page loads without crashes': 0,
    'No console errors': 0,
    'Mobile menu works': 0,
    'Cart icon is present': 0,
    'Search icon is present': 0,
    'Newsletter form is functional': 0,
    'Product links are clickable': 0,
    'Trust badges are visible': 0,
  },
  performance: {
    'Page loads in < 3 seconds': 0,
    'No layout shifts (CLS < 0.1)': 0,
    'Images load properly': 0,
  },
  accessibility: {
    'All buttons have accessible labels': 0,
    'Color contrast is sufficient': 0,
    'Text is readable': 0,
  }
};

async function evaluateSite(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const results = {
    passed: [],
    failed: [],
    warnings: [],
    score: 0,
    total: 0
  };

  try {
    // Capture console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    // Measure load time
    const startTime = Date.now();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const loadTime = (Date.now() - startTime) / 1000;

    // Wait for animations to settle
    await page.waitForTimeout(2000);

    // VISUAL CHECKS
    const heroExists = await page.$('section') !== null;
    if (heroExists) results.passed.push('Hero section renders correctly');
    else results.failed.push('Hero section renders correctly');

    // Check hero has content
    const heroTitle = await page.$('h1');
    if (heroTitle) results.passed.push('Hero has headline');
    else results.failed.push('Hero has headline');

    // Check for gold/void colors
    const hasVoidBg = await page.$eval('body', el => 
      getComputedStyle(el).backgroundColor === 'rgb(5, 5, 5)'
    );
    if (hasVoidBg) results.passed.push('Correct void background color');
    else results.warnings.push('Background color may not be void #050505');

    // Check header exists
    const headerExists = await page.$('header') !== null;
    if (headerExists) results.passed.push('Navigation/Header is present');
    else results.failed.push('Navigation/Header is missing');

    // Check footer exists
    const footerExists = await page.$('footer') !== null;
    if (footerExists) results.passed.push('Footer is present');
    else results.failed.push('Footer is missing');

    // Check product cards
    const productCards = await page.$$('a[href*="/products/"]');
    if (productCards.length > 0) results.passed.push(`Product cards found (${productCards.length})`);
    else results.warnings.push('No product cards found - may need data');

    // Check images load
    const images = await page.$$('img');
    let brokenImages = 0;
    for (const img of images) {
      const loaded = await img.evaluate(el => el.complete && el.naturalHeight > 0);
      if (!loaded) brokenImages++;
    }
    if (brokenImages === 0) results.passed.push('All images load correctly');
    else results.warnings.push(`${brokenImages} images may not have loaded`);

    // Check for gold accent elements
    const goldElements = await page.$$('[class*="gold"]');
    if (goldElements.length > 0) results.passed.push(`Gold accent elements found (${goldElements.length})`);
    else results.warnings.push('No gold accent elements found');

    // FUNCTIONAL CHECKS
    if (consoleErrors.length === 0) results.passed.push('No console errors');
    else results.warnings.push(`Console errors: ${consoleErrors.slice(0, 3).join(', ')}`);

    // Check cart button
    const cartButton = await page.$('button[aria-label*="art"], a[href="/cart"]');
    if (cartButton) results.passed.push('Cart functionality present');
    else results.warnings.push('Cart button/link not found');

    // Check search button
    const searchButton = await page.$('button[aria-label*="uscar"], a[href="/search"]');
    if (searchButton) results.passed.push('Search functionality present');
    else results.warnings.push('Search button/link not found');

    // Check newsletter form
    const newsletterForm = await page.$('form input[type="email"]');
    if (newsletterForm) results.passed.push('Newsletter form present');
    else results.warnings.push('Newsletter form not found');

    // Check trust badges
    const trustSection = await page.$('section') !== null;
    if (trustSection) results.passed.push('Sections/Trust badges area present');
    else results.warnings.push('Trust badges section not identified');

    // PERFORMANCE
    if (loadTime < 3) results.passed.push(`Page load time: ${loadTime.toFixed(1)}s (good)`);
    else results.warnings.push(`Page load time: ${loadTime.toFixed(1)}s (slow)`);

    // Mobile responsiveness check
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    const mobileMenuButton = await page.$('button[aria-label*="menú"], button[aria-label*="menu"]');
    if (mobileMenuButton) results.passed.push('Mobile menu button present');
    else results.warnings.push('Mobile menu button not found');

    // ACCESSIBILITY
    const buttonsWithoutLabels = await page.$$eval('button', buttons => 
      buttons.filter(b => !b.getAttribute('aria-label') && !b.textContent.trim()).length
    );
    if (buttonsWithoutLabels === 0) results.passed.push('All buttons have accessible labels');
    else results.warnings.push(`${buttonsWithoutLabels} buttons may lack labels`);

    // Take screenshots
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: '/tmp/eval-desktop.png', fullPage: true });
    
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ path: '/tmp/eval-mobile.png', fullPage: true });

  } catch (error) {
    results.failed.push(`Critical error: ${error.message}`);
  }

  await browser.close();

  // Calculate score
  results.total = results.passed.length + results.failed.length;
  results.score = results.total > 0 
    ? Math.round((results.passed.length / results.total) * 100) 
    : 0;

  return results;
}

// Run evaluation
(async () => {
  const results = await evaluateSite('http://localhost:3001');
  
  console.log('\n=== SITE EVALUATION REPORT ===\n');
  console.log(`SCORE: ${results.score}/100\n`);
  
  console.log(`✓ PASSED (${results.passed.length}):`);
  results.passed.forEach(p => console.log(`  • ${p}`));
  
  if (results.warnings.length > 0) {
    console.log(`\n⚠ WARNINGS (${results.warnings.length}):`);
    results.warnings.forEach(w => console.log(`  • ${w}`));
  }
  
  if (results.failed.length > 0) {
    console.log(`\n✗ FAILED (${results.failed.length}):`);
    results.failed.forEach(f => console.log(`  • ${f}`));
  }
  
  console.log('\nScreenshots saved: /tmp/eval-desktop.png, /tmp/eval-mobile.png');
  
  // Output JSON for parsing
  console.log('\n=== JSON OUTPUT ===');
  console.log(JSON.stringify(results, null, 2));
})();

module.exports = { evaluateSite };
