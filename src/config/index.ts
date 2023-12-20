export { excelToFeature } from './excel/excel.feature'
export { excelToPageConfig } from './excel/excel.pageconfig';
import fs from 'fs';
import path from 'path';
import { ExcelConfig } from './config.type';
import { excelToFeature } from './excel/excel.feature';
import { excelToPageConfig } from './excel/excel.pageconfig';
import { Feature } from '../feature/feature.type';
import { PageObject } from '../page/pageobject';
import { generateFeatureBDDFile } from './generate/feature.bdd.generate';
import { generatePageFile } from './generate/page.generate';
import { generateFeatureConfigFile } from './generate/feature.config.generate';


const configpath = path.join(__dirname, "../..", "config");
let isInitConfig = false;
let excelConfig: ExcelConfig[] | null = null;
const initConfig = () => {
    if (!isInitConfig) {
        const excelconfigpath = path.join(configpath, "excel.config.json");
        const exceldata = fs.readFileSync(excelconfigpath, 'utf-8');
        excelConfig = JSON.parse(exceldata) as ExcelConfig[];
        isInitConfig = true;
    }
    return { excelConfig };
}
const appConfig = initConfig();

const readConfigFromDataSource = async (inputType:"json" | "excel" | "db", inputValue:string) => {
    switch(inputType) {
        case 'excel':
            const testconfig = inputValue ? inputValue : path.join(__dirname, "../../..", "test/data","scenariodata.xlsx");
            const features = await excelToFeature(testconfig); 
            const pages = await excelToPageConfig(testconfig);
            return {features, pages};
        case 'json':
        default :
            throw new Error(inputType+" Not Implemented");
    }
}

const generateConfigFile = async (features: Feature[], pages: PageObject[]) => {
    await generateFeatureBDDFile(features);
    await generateFeatureConfigFile(features);
    await generatePageFile(pages);
}

export { readConfigFromDataSource, generateConfigFile, appConfig }
