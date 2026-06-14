#!/usr/bin/env node

/**
 * Autonomous AI Agent Execution Wrapper
 * 
 * This script provides a comprehensive automation wrapper for running
 * Playwright Test Agents in a closed loop for autonomous testing.
 * 
 * Features:
 * - Triggers AI agent to crawl target URL
 * - Creates test plans based on exploratory sessions
 * - Automatically generates functional test scripts
 * - Executes tests and heals broken selectors
 * - Runs in a closed loop for continuous improvement
 */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

interface AgentConfig {
  targetUrl: string;
  baseUrl: string;
  outputDir: string;
  maxIterations: number;
  healOnFailure: boolean;
  generateNewTests: boolean;
}

class AutonomousAgentRunner {
  private config: AgentConfig;
  private iteration: number = 0;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  /**
   * Run the complete autonomous agent loop
   */
  async run(): Promise<void> {
    console.log('🚀 Starting Autonomous AI Agent Loop');
    console.log(`📍 Target URL: ${this.config.targetUrl}`);
    console.log(`🔧 Base URL: ${this.config.baseUrl}`);
    console.log(`📁 Output Directory: ${this.config.outputDir}`);
    console.log(`🔄 Max Iterations: ${this.config.maxIterations}`);
    console.log('');

    try {
      while (this.iteration < this.config.maxIterations) {
        this.iteration++;
        console.log(`\n${'='.repeat(60)}`);
        console.log(`Iteration ${this.iteration}/${this.config.maxIterations}`);
        console.log(`${'='.repeat(60)}\n`);

        // Step 1: Initialize agents
        await this.initializeAgents();

        // Step 2: Crawl and explore target URL
        await this.crawlTargetUrl();

        // Step 3: Generate test plans
        await this.generateTestPlans();

        // Step 4: Generate test scripts
        if (this.config.generateNewTests) {
          await this.generateTestScripts();
        }

        // Step 5: Execute tests
        const testResults = await this.executeTests();

        // Step 6: Heal failures if enabled
        if (this.config.healOnFailure && testResults.hasFailures) {
          await this.healFailures();
        }

        // Step 7: Generate report
        await this.generateReport(testResults);

        console.log(`\n✅ Iteration ${this.iteration} completed`);
      }

      console.log('\n🎉 Autonomous agent loop completed successfully');
    } catch (error) {
      console.error('❌ Error in autonomous agent loop:', error);
      throw error;
    }
  }

  /**
   * Initialize Playwright Test Agents
   */
  private async initializeAgents(): Promise<void> {
    console.log('🔧 Initializing Playwright Test Agents...');
    
    try {
      await execAsync('npx playwright init-agents --loop=vscode');
      console.log('✅ Agents initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize agents:', error);
      throw error;
    }
  }

  /**
   * Crawl and explore the target URL
   */
  private async crawlTargetUrl(): Promise<void> {
    console.log(`🔍 Crawling target URL: ${this.config.targetUrl}`);
    
    try {
      // Use Playwright codegen to explore the application
      const command = `npx playwright codegen ${this.config.targetUrl} --output=${this.config.outputDir}/exploratory-session-${this.iteration}.spec.ts`;
      await execAsync(command);
      console.log('✅ Crawling completed');
    } catch (error) {
      console.error('❌ Failed to crawl target URL:', error);
      throw error;
    }
  }

  /**
   * Generate test plans using the Planner Agent
   */
  private async generateTestPlans(): Promise<void> {
    console.log('📋 Generating test plans with Planner Agent...');
    
    try {
      // Run the planner agent
      const command = `npx playwright test-agent --mode=plan --target=${this.config.targetUrl}`;
      await execAsync(command);
      console.log('✅ Test plans generated');
    } catch (error) {
      console.error('❌ Failed to generate test plans:', error);
      throw error;
    }
  }

  /**
   * Generate test scripts using the Generator Agent
   */
  private async generateTestScripts(): Promise<void> {
    console.log('⚙️ Generating test scripts with Generator Agent...');
    
    try {
      // Run the generator agent
      const command = `npx playwright test-agent --mode=generate --target=${this.config.targetUrl}`;
      await execAsync(command);
      console.log('✅ Test scripts generated');
    } catch (error) {
      console.error('❌ Failed to generate test scripts:', error);
      throw error;
    }
  }

  /**
   * Execute all tests
   */
  private async executeTests(): Promise<{ hasFailures: boolean; results: any }> {
    console.log('🧪 Executing tests...');
    
    try {
      // Run tests and capture results
      const command = `npx playwright test --reporter=json`;
      const { stdout } = await execAsync(command);
      
      const results = JSON.parse(stdout);
      const hasFailures = results.status === 'failed';
      
      console.log(`✅ Tests executed - Status: ${results.status}`);
      console.log(`   Total: ${results.stats.total}`);
      console.log(`   Passed: ${results.stats.expected}`);
      console.log(`   Failed: ${results.stats.unexpected}`);
      
      return { hasFailures, results };
    } catch (error) {
      console.error('❌ Failed to execute tests:', error);
      // Return failure status even if command failed
      return { hasFailures: true, results: null };
    }
  }

  /**
   * Heal test failures using the Healer Agent
   */
  private async healFailures(): Promise<void> {
    console.log('🔧 Healing test failures with Healer Agent...');
    
    try {
      // Run the healer agent on failed tests
      const command = `npx playwright test-agent --mode=heal --only-failed`;
      await execAsync(command);
      console.log('✅ Test failures healed');
    } catch (error) {
      console.error('❌ Failed to heal failures:', error);
      throw error;
    }
  }

  /**
   * Generate comprehensive report
   */
  private async generateReport(testResults: any): Promise<void> {
    console.log('📊 Generating report...');
    
    try {
      const reportPath = path.join(this.config.outputDir, `report-iteration-${this.iteration}.json`);
      const report = {
        iteration: this.iteration,
        timestamp: new Date().toISOString(),
        targetUrl: this.config.targetUrl,
        testResults: testResults.results,
        summary: {
          total: testResults.results?.stats?.total || 0,
          passed: testResults.results?.stats?.expected || 0,
          failed: testResults.results?.stats?.unexpected || 0,
        }
      };
      
      // Ensure output directory exists
      if (!fs.existsSync(this.config.outputDir)) {
        fs.mkdirSync(this.config.outputDir, { recursive: true });
      }
      
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`✅ Report generated: ${reportPath}`);
    } catch (error) {
      console.error('❌ Failed to generate report:', error);
      throw error;
    }
  }
}

/**
 * Main execution function
 */
async function main() {
  // Configuration from environment variables or defaults
  const config: AgentConfig = {
    targetUrl: process.env.TARGET_URL || 'http://localhost:3000',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    outputDir: process.env.OUTPUT_DIR || './agent-reports',
    maxIterations: parseInt(process.env.MAX_ITERATIONS || '3'),
    healOnFailure: process.env.HEAL_ON_FAILURE !== 'false',
    generateNewTests: process.env.GENERATE_NEW_TESTS !== 'false',
  };

  const runner = new AutonomousAgentRunner(config);
  
  try {
    await runner.run();
    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { AutonomousAgentRunner, AgentConfig };
