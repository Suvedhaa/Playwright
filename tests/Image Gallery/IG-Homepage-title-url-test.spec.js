
const { test, expect } = require('@playwright/test');

test('Home page title', async ({ page }) => {

    await page.goto('https://suvedhaa.neocities.org/Image_Gallery/Dynamic-Image-Gallery');

    const pageTitle = await page.title();
    console.log('Page title is ' + pageTitle);

    await expect(page).toHaveTitle('Image Gallery');

    await page.close();
}
)

test('Home page url', async ({ page }) => {

    await page.goto('https://suvedhaa.neocities.org/Image_Gallery/Dynamic-Image-Gallery');

    const pageUrl = await page.url();
    console.log('Page url is ' + pageUrl);

    await expect(page).toHaveURL(pageUrl);

    await page.close();
}
)
