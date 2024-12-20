import { test, expect } from "@playwright/test";

test('To verify - Student Form page works or not', async ({ page }) => {

    await page.goto('https://suvedhaa.neocities.org/Student_Form/StudentFormIndex');

    await page.fill('id=one', 'Suvedhaa');
    await page.fill('id=two', '23');
    await page.getByRole('radio').nth(1).check();
    await page.selectOption('id=four','Python');
    await page.fill('id=five', 'suve@123.com');

    await page.click('#save');

    let givenName = await page.locator('#result-table > tr > td:nth-child(1) > p');
    let givenAge =  await page.locator('#result-table > tr > td:nth-child(2) > p');
    let givenGender =  await page.locator('#result-table > tr > td:nth-child(3) > p');
    let givenValue =  await page.locator('#result-table > tr > td:nth-child(4) > p');
    let givenEmail = await page.locator('#result-table > tr > td:nth-child(5) > p');

    await expect(givenName).toHaveText('Suvedhaa');
    await expect(givenAge).toHaveText('23');
    await expect(givenGender).toHaveText('Female');
    await expect(givenValue).toHaveText('Python');
    await expect(givenEmail).toHaveText('suve@123.com');

    await page.getByRole('row', { name: 'Suvedhaa 23 Female Python suve@123.com Delete' }).getByRole('button').click();

    await expect(givenName).not.toBeVisible();
    await expect(givenAge).not.toBeVisible();
    await expect(givenGender).not.toBeVisible();
    await expect(givenValue).not.toBeVisible();
    await expect(givenEmail).not.toBeVisible();

    // // Assertions to verify table values
    // await expect(page.locator('#result-table > tr > td:nth-child(1) > p')).toHaveText('Suvedhaa');

    await page.close();
}
);