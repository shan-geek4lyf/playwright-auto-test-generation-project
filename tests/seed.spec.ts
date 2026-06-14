import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * Seed Test File
 * 
 * This file serves as a reference seed for the AI Generator Agent.
 * It demonstrates the framework's coding standards, best practices,
 * and custom fixtures. The Generator Agent will use this as a template
 * for generating autonomous test scripts.
 * 
 * Key Patterns Demonstrated:
 * - Page Object Model (POM) usage
 * - Semantic locator strategies
 * - Test organization with describe/test blocks
 * - Proper setup/teardown with beforeEach/afterEach
 * - Assertion best practices
 * - Test step grouping for better debugging
 * - Error handling and retry logic
 */

test.describe('Authentication Flow', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  // Setup before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto('/login');
  });

  test('should display login page with all required elements', async ({ page }) => {
    await test.step('Verify login page is displayed', async () => {
      await loginPage.assertLoginPageDisplayed();
    });

    await test.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Login/);
    });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await test.step('Enter valid credentials', async () => {
      await loginPage.enterUsername('testuser@example.com');
      await loginPage.enterPassword('SecurePassword123!');
    });

    await test.step('Submit login form', async () => {
      await loginPage.clickLogin();
    });

    await test.step('Verify redirect to dashboard', async () => {
      await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
    });

    await test.step('Verify dashboard is displayed', async () => {
      await dashboardPage.assertDashboardDisplayed();
    });

    await test.step('Verify welcome message', async () => {
      await dashboardPage.assertWelcomeMessageContains('testuser');
    });
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await test.step('Enter invalid credentials', async () => {
      await loginPage.enterUsername('invalid@example.com');
      await loginPage.enterPassword('wrongpassword');
    });

    await test.step('Submit login form', async () => {
      await loginPage.clickLogin();
    });

    await test.step('Verify error message is displayed', async () => {
      await loginPage.assertErrorMessage('Invalid credentials');
    });

    await test.step('Verify user remains on login page', async () => {
      await expect(page).toHaveURL('/login');
    });
  });

  test('should show error for empty username', async ({ page }) => {
    await test.step('Leave username empty', async () => {
      await loginPage.enterUsername('');
    });

    await test.step('Enter password', async () => {
      await loginPage.enterPassword('SecurePassword123!');
    });

    await test.step('Verify login button is disabled', async () => {
      await loginPage.assertLoginButtonDisabled();
    });
  });

  test('should show error for empty password', async ({ page }) => {
    await test.step('Enter username', async () => {
      await loginPage.enterUsername('testuser@example.com');
    });

    await test.step('Leave password empty', async () => {
      await loginPage.enterPassword('');
    });

    await test.step('Verify login button is disabled', async () => {
      await loginPage.assertLoginButtonDisabled();
    });
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await test.step('Click forgot password link', async () => {
      await loginPage.clickForgotPassword();
    });

    await test.step('Verify redirect to forgot password page', async () => {
      await expect(page).toHaveURL('/forgot-password');
    });
  });

  test('should navigate to sign up page', async ({ page }) => {
    await test.step('Click sign up link', async () => {
      await loginPage.clickSignUp();
    });

    await test.step('Verify redirect to sign up page', async () => {
      await expect(page).toHaveURL('/signup');
    });
  });
});

test.describe('Dashboard Navigation', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Login before each dashboard test
    await page.goto('/login');
    await loginPage.login('testuser@example.com', 'SecurePassword123!');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display dashboard with all components', async ({ page }) => {
    await test.step('Verify dashboard is displayed', async () => {
      await dashboardPage.assertDashboardDisplayed();
    });

    await test.step('Verify sidebar is visible', async () => {
      await dashboardPage.assertSidebarVisible();
    });

    await test.step('Verify navigation menu', async () => {
      await expect(dashboardPage.navigationMenu).toBeVisible();
    });
  });

  test('should navigate to different menu items', async ({ page }) => {
    await test.step('Navigate to Profile', async () => {
      await dashboardPage.navigateToMenuItem('Profile');
      await expect(page).toHaveURL('/profile');
    });

    await test.step('Navigate to Settings', async () => {
      await dashboardPage.navigateToMenuItem('Settings');
      await expect(page).toHaveURL('/settings');
    });
  });

  test('should logout successfully', async ({ page }) => {
    await test.step('Click logout', async () => {
      await dashboardPage.clickLogout();
    });

    await test.step('Verify redirect to login page', async () => {
      await expect(page).toHaveURL('/login');
    });

    await test.step('Verify login page is displayed', async () => {
      await loginPage.assertLoginPageDisplayed();
    });
  });

  test('should search functionality work', async ({ page }) => {
    await test.step('Enter search query', async () => {
      await dashboardPage.enterSearchQuery('test query');
    });

    await test.step('Verify search input has value', async () => {
      await expect(dashboardPage.searchInput).toHaveValue('test query');
    });
  });
});

test.describe('Accessibility Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/login');
  });

  test('should have proper ARIA labels on login form', async ({ page }) => {
    await test.step('Check username input has label', async () => {
      await expect(loginPage.usernameInput).toHaveAttribute('aria-label', 'Email Address');
    });

    await test.step('Check password input has label', async () => {
      await expect(loginPage.passwordInput).toHaveAttribute('aria-label', 'Password');
    });

    await test.step('Check login button has role', async () => {
      await expect(loginPage.loginButton).toHaveAttribute('role', 'button');
    });
  });

  test('should be keyboard navigable', async ({ page }) => {
    await test.step('Tab to username input', async () => {
      await page.keyboard.press('Tab');
      await expect(loginPage.usernameInput).toBeFocused();
    });

    await test.step('Tab to password input', async () => {
      await page.keyboard.press('Tab');
      await expect(loginPage.passwordInput).toBeFocused();
    });

    await test.step('Tab to login button', async () => {
      await page.keyboard.press('Tab');
      await expect(loginPage.loginButton).toBeFocused();
    });

    await test.step('Press Enter to submit', async () => {
      await page.keyboard.press('Enter');
      // Verify form submission behavior
    });
  });
});

test.describe('Responsive Design Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should display correctly on mobile viewport', async ({ page }) => {
    await test.step('Set mobile viewport', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    await test.step('Navigate to login', async () => {
      await page.goto('/login');
    });

    await test.step('Verify login form is visible on mobile', async () => {
      await loginPage.assertLoginPageDisplayed();
    });
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await test.step('Set tablet viewport', async () => {
      await page.setViewportSize({ width: 768, height: 1024 });
    });

    await test.step('Navigate to login', async () => {
      await page.goto('/login');
    });

    await test.step('Verify login form is visible on tablet', async () => {
      await loginPage.assertLoginPageDisplayed();
    });
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    await test.step('Set desktop viewport', async () => {
      await page.setViewportSize({ width: 1920, height: 1080 });
    });

    await test.step('Navigate to login', async () => {
      await page.goto('/login');
    });

    await test.step('Verify login form is visible on desktop', async () => {
      await loginPage.assertLoginPageDisplayed();
    });
  });
});
