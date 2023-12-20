import { Command } from 'commander';
import {excelToFeature, excelToPageConfig} from '../config'
import * as dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
import { generatePageFile } from '../config/generate/page.generate';
import { generateFeatureBDDFile } from '../config/generate/feature.bdd.generate';
import { generateFeatureConfigFile } from '../config/generate/feature.config.generate';

// Load dotenv to read variables from .env file
dotenv.config();

const program = new Command();

program
    .name('Feature and Page Config Generate')
    .version('1.0.0')
    .description('CLI for generating test configuration from simple data entry configuration source')
    .option('-e, --excel <value>', 'config excel file path', '')
    .option('-t, --targetfolder <value>', 'target folder data to generate the config files', '')
    .parse(process.argv);
    
const options = program.opts();

const configGen = async () => {
     if (options.excel) {
        // feature config needs to be generated
        if (fs.existsSync(options.excel)) {

            console.log("Parsing excel configuration file....")
            const features = await excelToFeature(options.excel);
            const pages = await excelToPageConfig(options.excel);

            fs.removeSync(options.targetfolder);
            fs.ensureDirSync(options.targetfolder);

            console.log("Generating feature bdd files....")
            const featureconfigfolder = path.join(options.targetfolder, "features");
            fs.ensureDirSync(featureconfigfolder);
            await generateFeatureBDDFile(features,featureconfigfolder)
            
            const configfolder = path.join(options.targetfolder, "config");

            console.log("Generating feature config file....")
            fs.ensureDirSync(configfolder);
            const featureconfigfilepath = path.join(configfolder, "featureconfig.json");
            await generateFeatureConfigFile(features, featureconfigfilepath);            
            
            console.log("Generating page config file....")
            fs.ensureDirSync(configfolder);
            const pageconfigfilepath = path.join(configfolder, "pageconfig.json");
            await generatePageFile(pages, pageconfigfilepath);            
        }
        else{
            throw new Error("Invalid file path provided for feature config excel file")
        }
    }
    
}

configGen();