import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { excelToPageConfig } from './excel.pageconfig';
import { generatePageFile } from '../generate/page.generate';
import * as fs from 'fs';

describe('page config', () => {

  test('parse page config data', async () => {
    const testconfig = path.join(__dirname, "../../..", "test/data", "scenariodata.xlsx");
    const pages = await excelToPageConfig(testconfig);
    expect(pages.length).toBeGreaterThan(0)
  });

  test('generate page config', async () => {
    const testconfigexcel = path.join(__dirname, "../../..", "test/data", "scenariodata.xlsx");
    const pages = await excelToPageConfig(testconfigexcel);
    expect(pages.length).toBeGreaterThan(0)
    const pageconfig = path.join(__dirname, "../../..", "test/data", "pageconfig.json");
    if (fs.existsSync(pageconfig)) {
      fs.unlinkSync(pageconfig);
    }
    await generatePageFile(pages, pageconfig);
    expect(fs.existsSync(pageconfig)).toBeTruthy();
  });

});