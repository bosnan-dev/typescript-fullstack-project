import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search';

//cache tes

test('Search and select product happy path', async ({ page }) => {
  const searchPage = new SearchPage(page);
  await searchPage.goto();
  await searchPage.selectFilter('Collection 0');
  await searchPage.search('Product');

  // Navigating
  await page.getByText('Product 0').click();

  expect(page.url()).toBe('http://localhost:4173/product/1');

  await expect(page.getByText('Product 0')).toBeVisible();
});
