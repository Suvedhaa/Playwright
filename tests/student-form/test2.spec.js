import { test, expect } from "@playwright/test";

test('Multiple locators', async ({ page }) => {

    await page.goto('https://suvedhaa.neocities.org/Student_Form/StudentFormIndex');

    await page.fill('id=one', 'Suvedhaa');
    await page.fill('id=two', '23');
    await page.fill('id=five', 'suve@123.com');

    await page.click('#save');

    await page.fill('id=one', 'Sow');
    await page.fill('id=two', '20');
    await page.fill('id=five', 'sow@123.com');

    await page.click('#save');

    const details = await page.$$("//div[@id='result-container']//table//p");

    for (const detail of details) {

        const detailValues = await detail.textContent();
        console.log(detailValues);

    }

    await page.close();
}
);