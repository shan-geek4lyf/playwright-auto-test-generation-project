import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Class
 * 
 * Provides common functionality and utilities for all page objects.
 * All page classes should extend this base class to ensure consistency
 * and reduce code duplication across the framework.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigation Methods

  /**
   * Navigate to a specific path relative to baseURL
   * @param path - The path to navigate to (e.g., '/login')
   */
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Navigate to full URL
   * @param url - The full URL to navigate to
   */
  async navigateToUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Reload the current page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Go forward in browser history
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  // Wait Methods

  /**
   * Wait for a specified amount of time
   * @param ms - Time to wait in milliseconds
   */
  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for element to be visible
   * @param locator - The element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param locator - The element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForHidden(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for element to be attached to DOM
   * @param locator - The element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForAttached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for element to be detached from DOM
   * @param locator - The element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForDetached(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'detached', timeout });
  }

  // Screenshot Methods

  /**
   * Take a screenshot of the current page
   * @param path - Path where screenshot should be saved
   */
  async takeScreenshot(path: string): Promise<void> {
    await this.page.screenshot({ path, fullPage: true });
  }

  /**
   * Take a screenshot of a specific element
   * @param locator - The element locator
   * @param path - Path where screenshot should be saved
   */
  async takeElementScreenshot(locator: Locator, path: string): Promise<void> {
    await locator.screenshot({ path });
  }

  // Assertion Helper Methods

  /**
   * Assert that element is visible
   * @param locator - The element locator
   * @param message - Optional assertion message
   */
  async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  /**
   * Assert that element is hidden
   * @param locator - The element locator
   * @param message - Optional assertion message
   */
  async assertHidden(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeHidden();
  }

  /**
   * Assert that element has specific text
   * @param locator - The element locator
   * @param text - Expected text
   * @param message - Optional assertion message
   */
  async assertText(locator: Locator, text: string, message?: string): Promise<void> {
    await expect(locator, message).toHaveText(text);
  }

  /**
   * Assert that element contains specific text
   * @param locator - The element locator
   * @param text - Expected text to contain
   * @param message - Optional assertion message
   */
  async assertContainsText(locator: Locator, text: string, message?: string): Promise<void> {
    await expect(locator, message).toContainText(text);
  }

  /**
   * Assert that element is enabled
   * @param locator - The element locator
   * @param message - Optional assertion message
   */
  async assertEnabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeEnabled();
  }

  /**
   * Assert that element is disabled
   * @param locator - The element locator
   * @param message - Optional assertion message
   */
  async assertDisabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeDisabled();
  }

  /**
   * Assert that page has specific URL
   * @param url - Expected URL
   * @param message - Optional assertion message
   */
  async assertUrl(url: string, message?: string): Promise<void> {
    await expect(this.page, message).toHaveURL(url);
  }

  /**
   * Assert that page URL contains specific path
   * @param path - Expected path
   * @param message - Optional assertion message
   */
  async assertUrlContains(path: string, message?: string): Promise<void> {
    await expect(this.page, message).toHaveURL(new RegExp(path));
  }

  /**
   * Assert that element has specific attribute value
   * @param locator - The element locator
   * @param attribute - Attribute name
   * @param value - Expected attribute value
   * @param message - Optional assertion message
   */
  async assertAttribute(
    locator: Locator,
    attribute: string,
    value: string,
    message?: string
  ): Promise<void> {
    await expect(locator, message).toHaveAttribute(attribute, value);
  }

  // Utility Methods

  /**
   * Get text content of an element
   * @param locator - The element locator
   * @returns Text content of the element
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Get attribute value of an element
   * @param locator - The element locator
   * @param attribute - Attribute name
   * @returns Attribute value
   */
  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return await locator.getAttribute(attribute);
  }

  /**
   * Check if element is visible
   * @param locator - The element locator
   * @returns True if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Check if element is enabled
   * @param locator - The element locator
   * @returns True if element is enabled
   */
  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  /**
   * Scroll element into view
   * @param locator - The element locator
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Hover over an element
   * @param locator - The element locator
   */
  async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }

  /**
   * Get current page URL
   * @returns Current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   * @returns Page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // Form Helper Methods

  /**
   * Fill a form field
   * @param locator - The input field locator
   * @param value - Value to fill
   */
  async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  /**
   * Clear a form field
   * @param locator - The input field locator
   */
  async clearInput(locator: Locator): Promise<void> {
    await locator.clear();
  }

  /**
   * Select an option from a dropdown
   * @param locator - The select element locator
   * @param value - Option value to select
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  /**
   * Check a checkbox
   * @param locator - The checkbox locator
   */
  async checkCheckbox(locator: Locator): Promise<void> {
    await locator.check();
  }

  /**
   * Uncheck a checkbox
   * @param locator - The checkbox locator
   */
  async uncheckCheckbox(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  // JavaScript Execution

  /**
   * Execute JavaScript in the page context
   * @param script - JavaScript code to execute
   * @param args - Arguments to pass to the script
   * @returns Result of script execution
   */
  async evaluate<R>(script: string | Function, ...args: any[]): Promise<R> {
    return await this.page.evaluate(script, ...args);
  }

  /**
   * Execute JavaScript on a specific element
   * @param locator - The element locator
   * @param script - JavaScript code to execute
   * @param args - Arguments to pass to the script
   * @returns Result of script execution
   */
  async evaluateOnElement<R>(
    locator: Locator,
    script: string | Function,
    ...args: any[]
  ): Promise<R> {
    return await locator.evaluate(script, ...args);
  }
}
