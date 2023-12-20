import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

require('dotenv').config();

const testDir = defineBddConfig({
  
  paths: ['features/**/*.feature'],
  require: ['src/steps/**/*.ts'],
  quotes: 'backtick',
});

export default defineConfig({
  testDir,
  reporter: [['json', { outputFile: 'results.json' }]],
  //reporter: ''
});
