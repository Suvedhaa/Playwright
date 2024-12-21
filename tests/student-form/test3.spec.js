import { test, expect } from '@playwright/test';

test('test3', async ({ page }) => {
  await page.goto('https://suvedhaa.neocities.org/Student_Form/StudentFormIndex');
  
  await page.locator('#one').click();
  await page.locator('#one').fill('Suvedhaa');
  await page.locator('#two').click();
  await page.locator('#two').fill('23');
  await page.getByRole('radio').nth(1).check();
  await page.locator('#four').selectOption('Python');
  await page.locator('#five').click();
  await page.locator('#five').fill('suve@123.com');
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByText('Suvedhaa').click();
  await page.getByText('23', { exact: true }).click();
  await page.getByText('Female', { exact: true }).click();
  await page.getByRole('cell', { name: 'Python' }).getByRole('paragraph').click();
  await page.getByText('suve@123.com').click();

  await page.locator('#one').click();
  await page.locator('#one').fill('sowmya');
  await page.locator('#two').click();
  await page.locator('#two').fill('20');
  await page.getByRole('radio').nth(1).check();
  await page.locator('#five').click();
  await page.locator('#five').fill('sow@123.com');
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByText('sowmya').click();
  await page.getByText('20').click();
  await page.getByText('Female').nth(2).click();
  await page.locator('#result-table').getByText('JavaScript').click();
  await page.getByText('sow@123.com').click();

  await page.locator('#one').click();
  await page.locator('#one').fill('123');
  await page.locator('#two').click();
  await page.locator('#two').fill('123');
  await page.getByRole('radio').first().check();
  await page.locator('#four').selectOption('Java');
  await page.locator('#five').click();
  await page.locator('#five').fill('123');
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByRole('row', { name: '123 Male Java 123 Delete' }).getByRole('button').click();
});