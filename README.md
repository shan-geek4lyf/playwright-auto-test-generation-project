# Playwright Autonomous E2E Testing Framework

A production-ready, autonomous E2E testing framework built with Playwright (TypeScript) and integrated AI capabilities for test planning, autonomous script generation, execution, and self-healing.

## 🚀 Features

- **Autonomous Test Generation**: AI-powered test planning and script generation
- **Self-Healing**: Automatic detection and repair of broken locators
- **Page Object Model**: Clean, maintainable test architecture
- **Multi-Browser Support**: Chromium, Firefox, WebKit, and mobile viewports
- **Parallel Execution**: Optimized test performance with worker parallelization
- **Comprehensive Reporting**: HTML reports, video recordings, and trace files
- **CI/CD Integration**: GitHub Actions workflow for automated testing
- **Accessibility Testing**: Built-in accessibility verification
- **Responsive Design Testing**: Mobile, tablet, and desktop viewport testing

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright-auto-test-generation-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:playwright
   ```

4. **Initialize AI Agents**
   ```bash
   npm run init:agents
   ```

## 📁 Project Structure

```
├── .github/workflows/       # CI/CD autonomous pipeline
├── agents/                  # Configuration markdown for Playwright Agents
│   ├── planner.agent.md     # Test planning agent configuration
│   ├── generator.agent.md   # Test generation agent configuration
│   └── healer.agent.md     # Self-healing agent configuration
├── pages/                   # POM Page Object files
│   ├── BasePage.ts         # Base page class with common utilities
│   ├── LoginPage.ts        # Login page object
│   └── DashboardPage.ts    # Dashboard page object
├── scripts/                 # Automation and utility scripts
│   └── run-autonomous-agents.ts  # Autonomous agent execution wrapper
├── tests/                   # Autonomous/generated test specs
│   ├── seed.spec.ts        # Reference seed file for AI context
│   ├── global-setup.ts     # Global test setup
│   └── global-teardown.ts  # Global test teardown
├── playwright.config.ts     # Main Playwright configuration
├── package.json             # Core scripts and dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md               # This file
```

## 🎯 Usage

### Manual Test Execution

Run all tests:
```bash
npm test
```

Run tests in headed mode:
```bash
npm run test:headed
```

Run tests in debug mode:
```bash
npm run test:debug
```

Run tests with UI mode:
```bash
npm run test:ui
```

Run tests on specific browser:
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

View HTML report:
```bash
npm run test:report
```

### AI Agent Operations

**Plan Tests** - Generate test plans from application analysis:
```bash
npm run agent:plan
```

**Generate Tests** - Create test scripts from test plans:
```bash
npm run agent:generate
```

**Heal Tests** - Automatically fix broken locators:
```bash
npm run agent:heal
```

**Autonomous Loop** - Run complete autonomous testing cycle:
```bash
npm run agent:autonomous
```

### Autonomous Agent Wrapper

Run the autonomous agent execution wrapper with custom configuration:

```bash
# Set environment variables
export TARGET_URL="http://your-app-url.com"
export BASE_URL="http://your-app-url.com"
export MAX_ITERATIONS="5"
export HEAL_ON_FAILURE="true"
export GENERATE_NEW_TESTS="true"

# Run the autonomous script
npx ts-node scripts/run-autonomous-agents.ts
```

Or use npm script:
```bash
TARGET_URL=http://localhost:3000 npm run agent:autonomous
```

## 🔧 Configuration

### Playwright Configuration

Edit `playwright.config.ts` to customize:
- Base URL
- Browser configurations
- Retry settings
- Timeout values
- Reporter settings
- Parallel execution options

### Environment Variables

Create a `.env` file in the project root:

```env
BASE_URL=http://localhost:3000
TARGET_URL=http://localhost:3000
MAX_ITERATIONS=3
HEAL_ON_FAILURE=true
GENERATE_NEW_TESTS=true
```

### Agent Configuration

Customize agent behavior by editing files in the `agents/` directory:
- `planner.agent.md` - Test planning rules and strategies
- `generator.agent.md` - Code generation standards and patterns
- `healer.agent.md` - Self-healing strategies and rules

## 📝 Creating New Tests

### Manual Test Creation

1. Create a new page object in `pages/`:
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewPage extends BasePage {
  readonly element: Locator;

  constructor(page: Page) {
    super(page);
    this.element = page.getByRole('button', { name: 'Submit' });
  }

  async clickElement(): Promise<void> {
    await this.element.click();
  }
}
```

2. Create a test file in `tests/`:
```typescript
import { test, expect } from '@playwright/test';
import { NewPage } from '../pages/NewPage';

test.describe('New Feature', () => {
  test('should perform action', async ({ page }) => {
    const newPage = new NewPage(page);
    await page.goto('/new-page');
    await newPage.clickElement();
    await expect(newPage.element).toBeVisible();
  });
});
```

### AI-Generated Tests

Use the autonomous agent workflow:
1. Run `npm run agent:plan` to generate test plans
2. Run `npm run agent:generate` to create test scripts
3. Run `npm test` to execute tests
4. Run `npm run agent:heal` if tests fail

## 🤖 AI Agent Workflow

The autonomous testing loop consists of:

1. **Planner Agent**: Analyzes application and creates test plans
2. **Generator Agent**: Converts plans into executable test scripts
3. **Healer Agent**: Detects and fixes broken locators automatically
4. **Execution**: Runs tests and captures results
5. **Reporting**: Generates comprehensive reports

## 🧪 Best Practices

### Locator Strategy (Priority Order)

1. **Semantic Locators** (Preferred):
   ```typescript
   page.getByRole('button', { name: 'Submit' })
   page.getByText('Welcome')
   page.getByLabel('Email')
   ```

2. **Test ID Locators**:
   ```typescript
   page.getByTestId('submit-button')
   ```

3. **CSS Selectors** (Last resort):
   ```typescript
   page.locator('.submit-button')
   ```

### Test Organization

- Use `test.describe()` for grouping related tests
- Use `test.beforeEach()` for setup
- Use `test.afterEach()` for cleanup
- Use `test.step()` for grouping actions
- Add descriptive test names

### Page Object Model

- Keep page objects focused on single pages
- Use semantic locators
- Implement reusable action methods
- Add assertion methods for common checks

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### UI Mode
```bash
npm run test:ui
```

### Trace Viewer
After test failure, view trace:
```bash
npx playwright show-trace trace.zip
```

### Video Recordings
Videos are saved in `test-results/` for failed tests.

## 🔄 CI/CD Pipeline

The framework includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:

- Runs tests on multiple browsers
- Executes autonomous agent loop
- Performs self-healing on failures
- Generates and uploads reports
- Comments PRs with test results

### Required Secrets

Configure these secrets in your GitHub repository:
- `BASE_URL` - Base URL of the application
- `TARGET_URL` - Target URL for autonomous crawling

## 📊 Reporting

### HTML Report
```bash
npm run test:report
```

### JSON Report
Results are saved in `test-results/results.json`

### Agent Reports
Autonomous agent reports are saved in `agent-reports/`

## 🛡️ Accessibility Testing

The framework includes accessibility tests using semantic locators:
```typescript
test('should have proper ARIA labels', async ({ page }) => {
  await expect(element).toHaveAttribute('aria-label', 'Button');
});
```

## 📱 Responsive Design Testing

Tests run on multiple viewports:
- Desktop: 1920x1080
- Tablet: 768x1024
- Mobile: 375x667

## 🔍 Self-Healing

The Healer Agent automatically:
- Detects broken locators
- Analyzes DOM snapshots
- Recalculates locators using semantic strategies
- Applies fixes and re-verifies tests

Healing strategies (in order of priority):
1. Semantic role locators
2. Text-based locators
3. Label-based locators
4. Test ID locators
5. CSS selectors (last resort)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📄 License

MIT

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Check the Playwright documentation: https://playwright.dev
- Review agent configuration files in `agents/` directory

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [AI Agents](https://playwright.dev/docs/test-agent)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

**Built with ❤️ using Playwright and TypeScript**
