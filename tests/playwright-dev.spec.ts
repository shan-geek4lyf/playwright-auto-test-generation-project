import { test, expect } from '@playwright/test';

/**
 * Playwright.dev Test Suite
 * 
 * Three test cases for https://playwright.dev/ demonstrating:
 * 1. Basic page load and title verification
 * 2. Navigation to Getting Started section
 * 3. Search functionality
 */

test.describe('Playwright.dev Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage with correct title', async ({ page }) => {
    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Playwright/);
    });

    await test.step('Verify main heading is visible', async () => {
      const heading = page.locator('.hero__title');
      await expect(heading).toBeVisible();
    });

    await test.step('Verify navigation is visible', async () => {
      const nav = page.getByRole('navigation');
      await expect(nav).toBeVisible();
    });
  });

  test('should navigate to Getting Started section', async ({ page }) => {
    await test.step('Click on Docs link', async () => {
      const docsLink = page.getByRole('link', { name: 'Docs' });
      await docsLink.click();
    });

    await test.step('Verify URL changed to docs', async () => {
      await expect(page).toHaveURL(/docs/);
    });

    await test.step('Verify docs heading is visible', async () => {
      const heading = page.getByRole('heading', { name: /Installation/ });
      await expect(heading).toBeVisible();
    });
  });

  test('should search for content', async ({ page }) => {
    await test.step('Click search button', async () => {
      const searchButton = page.getByRole('button', { name: 'Search' });
      await searchButton.click();
    });

    await test.step('Enter search query', async () => {
      const searchInput = page.getByPlaceholder('Search docs');
      await searchInput.fill('locator');
    });

    await test.step('Wait for search results', async () => {
      await page.waitForTimeout(2000);
    });

    await test.step('Verify search input has value', async () => {
      const searchInput = page.getByPlaceholder('Search docs');
      await expect(searchInput).toHaveValue('locator');
    });
  });
});
