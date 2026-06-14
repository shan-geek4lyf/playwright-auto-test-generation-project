import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object
 * 
 * Represents the login/authentication page of the application.
 * Provides methods for user authentication actions and assertions.
 */
export class LoginPage extends BasePage {
  // Locators using semantic selectors for better resilience
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginForm: Locator;

  constructor(page: Page) {
    super(page);
    
    // Semantic locators following best practices
    this.usernameInput = page.getByLabel('Email Address');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.errorMessage = page.getByRole('alert');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
    this.signUpLink = page.getByRole('link', { name: 'Sign Up' });
    this.rememberMeCheckbox = page.getByLabel('Remember me');
    this.loginForm = page.getByRole('form', { name: 'Login' });
  }

  // Action Methods

  /**
   * Enter username/email in the login field
   * @param username - The username or email to enter
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
  }

  /**
   * Enter password in the password field
   * @param password - The password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click the login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform complete login action
   * @param username - The username or email
   * @param password - The password
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Click the forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  /**
   * Click the sign up link
   */
  async clickSignUp(): Promise<void> {
    await this.signUpLink.click();
  }

  /**
   * Toggle the remember me checkbox
   */
  async toggleRememberMe(): Promise<void> {
    await this.checkCheckbox(this.rememberMeCheckbox);
  }

  // Assertion Methods

  /**
   * Verify that the login page is displayed
   */
  async assertLoginPageDisplayed(): Promise<void> {
    await this.assertVisible(this.loginForm, 'Login form should be visible');
    await this.assertVisible(this.usernameInput, 'Username input should be visible');
    await this.assertVisible(this.passwordInput, 'Password input should be visible');
    await this.assertVisible(this.loginButton, 'Login button should be visible');
  }

  /**
   * Verify that error message is displayed
   * @param expectedMessage - Expected error message text
   */
  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await this.assertVisible(this.errorMessage, 'Error message should be visible');
    await this.assertText(this.errorMessage, expectedMessage, 'Error message should match expected text');
  }

  /**
   * Verify that login button is enabled
   */
  async assertLoginButtonEnabled(): Promise<void> {
    await this.assertEnabled(this.loginButton, 'Login button should be enabled');
  }

  /**
   * Verify that login button is disabled
   */
  async assertLoginButtonDisabled(): Promise<void> {
    await this.assertDisabled(this.loginButton, 'Login button should be disabled');
  }
}
