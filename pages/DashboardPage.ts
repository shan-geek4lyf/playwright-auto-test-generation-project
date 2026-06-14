import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Dashboard Page Object
 * 
 * Represents the main dashboard page after successful authentication.
 * Provides methods for dashboard navigation and content verification.
 */
export class DashboardPage extends BasePage {
  // Locators using semantic selectors
  readonly welcomeMessage: Locator;
  readonly navigationMenu: Locator;
  readonly userProfile: Locator;
  readonly logoutButton: Locator;
  readonly sidebar: Locator;
  readonly contentArea: Locator;
  readonly notificationBell: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    
    // Semantic locators
    this.welcomeMessage = page.getByRole('heading', { name: /welcome/i });
    this.navigationMenu = page.getByRole('navigation');
    this.userProfile = page.getByRole('button', { name: /user profile/i });
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    this.sidebar = page.getByRole('complementary', { name: 'Sidebar' });
    this.contentArea = page.getByRole('main');
    this.notificationBell = page.getByRole('button', { name: /notifications/i });
    this.searchInput = page.getByPlaceholder('Search...');
  }

  // Action Methods

  /**
   * Click on user profile to open menu
   */
  async clickUserProfile(): Promise<void> {
    await this.userProfile.click();
  }

  /**
   * Click logout button
   */
  async clickLogout(): Promise<void> {
    await this.clickUserProfile();
    await this.logoutButton.click();
  }

  /**
   * Click on notification bell
   */
  async clickNotifications(): Promise<void> {
    await this.notificationBell.click();
  }

  /**
   * Enter search query
   * @param query - Search query text
   */
  async enterSearchQuery(query: string): Promise<void> {
    await this.fillInput(this.searchInput, query);
  }

  /**
   * Navigate to a specific menu item
   * @param menuItemName - Name of the menu item to click
   */
  async navigateToMenuItem(menuItemName: string): Promise<void> {
    await this.navigationMenu.getByRole('link', { name: menuItemName }).click();
  }

  // Assertion Methods

  /**
   * Verify that dashboard is displayed
   */
  async assertDashboardDisplayed(): Promise<void> {
    await this.assertVisible(this.welcomeMessage, 'Welcome message should be visible');
    await this.assertVisible(this.navigationMenu, 'Navigation menu should be visible');
    await this.assertVisible(this.contentArea, 'Content area should be visible');
  }

  /**
   * Verify welcome message contains username
   * @param username - Expected username in welcome message
   */
  async assertWelcomeMessageContains(username: string): Promise<void> {
    await this.assertContainsText(this.welcomeMessage, username, 'Welcome message should contain username');
  }

  /**
   * Verify that specific menu item is visible
   * @param menuItemName - Name of the menu item
   */
  async assertMenuItemVisible(menuItemName: string): Promise<void> {
    const menuItem = this.navigationMenu.getByRole('link', { name: menuItemName });
    await this.assertVisible(menuItem, `Menu item "${menuItemName}" should be visible`);
  }

  /**
   * Verify that sidebar is visible
   */
  async assertSidebarVisible(): Promise<void> {
    await this.assertVisible(this.sidebar, 'Sidebar should be visible');
  }

  /**
   * Verify that sidebar is hidden
   */
  async assertSidebarHidden(): Promise<void> {
    await this.assertHidden(this.sidebar, 'Sidebar should be hidden');
  }
}
