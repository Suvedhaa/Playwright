import { test, expect } from "@playwright/test";

test('To verify whether the added details shown correctly under the result table or not', async ({ page }) => {

    await page.goto('https://suvedhaa.neocities.org/Student_Form/StudentFormIndex');

    await page.fill('id=one', 'Suvedhaa');
    await page.fill('id=two', '23');
    await page.fill('id=five', 'suve@123.com');

    await page.click('#save');

    var givenName = await page.locator('#result-table > tr > td:nth-child(1) > p');
    var givenAge =  await page.locator('#result-table > tr > td:nth-child(2) > p');
    var givenEmail = await page.locator('#result-table > tr > td:nth-child(5) > p');

    await expect(givenName).toHaveText('Suvedhaa');
    await expect(givenAge).toHaveText('23');
    await expect(givenEmail).toHaveText('suve@123.com');

    // // Assertions to verify table values
    // await expect(page.locator('#result-table > tr > td:nth-child(1) > p')).toHaveText('Suvedhaa');
    // await expect(page.locator('#result-table > tr > td:nth-child(2) > p')).toHaveText('23');
    // await expect(page.locator('#result-table > tr > td:nth-child(5) > p')).toHaveText('suve@123.com');


    await page.close();
}
);