import {describe, expect, test} from '@jest/globals';
import ExcelJS from 'exceljs';
import path from 'path';
import { readEntityData } from './utils';
import { Feature } from '../../feature/feature.type';
import { excelToFeature } from './excel.feature';
import { generateFeatureBDDFile } from '../generate/feature.bdd.generate';
import fs from 'fs-extra';

describe('feature config', () => {
  test('read feature config data', async() => {
    const workbook = new ExcelJS.Workbook();
    const testconfig = path.join(__dirname, "../../..", "test/data","scenariodata.xlsx");
    await workbook.xlsx.readFile(testconfig);
    const data = readEntityData(workbook, "feature") as Feature[];
    expect(data.length).toBeGreaterThan(0)
  });

  test('parse feature config data', async() => {
    const testconfig = path.join(__dirname, "../../..", "test/data","scenariodata.xlsx");
    const features = await excelToFeature(testconfig);
    console.log(JSON.stringify(features[0],null,2))
    expect(features.length).toBeGreaterThan(0)
  });

  test('generate feature config file', async() => {
    const testconfig = path.join(__dirname, "../../..", "test/data","scenariodata.xlsx");
    const features = await excelToFeature(testconfig);
    expect(features.length).toBeGreaterThan(0);
    const featureconfigfolder = path.join(__dirname, "../../..", "test/features");
    fs.removeSync(featureconfigfolder);
    fs.ensureDirSync(featureconfigfolder);
    await generateFeatureBDDFile(features,featureconfigfolder)
    
  });


  
});