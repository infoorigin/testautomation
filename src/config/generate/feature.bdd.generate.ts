import path from "path";
import * as fs from 'fs';
import { Feature, Scenario } from "../../feature/feature.type";
import * as os from 'os';

const featureTemplate = (feature: Feature) => {
    return `Feature:${feature.name};Description:${''} ${os.EOL}${os.EOL}`;
}

const scenarioTemplate = (scenario: Scenario) => {
    const tagstr = scenario.tags ? scenario.tags.split(',').map(t => '@' + t).join('') : '';
    return `\tScenario:${scenario.id}~${scenario.name}~${tagstr ? tagstr : ''}${os.EOL}`;
}

const createFeatureFile = (feature: Feature, fileContent: string, featureconfigfolder?: string) => {
    const folderpath = featureconfigfolder ? featureconfigfolder : path.join(__dirname, '../../..', "features");
    const featureFilePath = path.join(folderpath, feature.name + ".feature");
    if (fs.existsSync(featureFilePath)) {
        fs.unlinkSync(featureFilePath);
    }
    fs.writeFileSync(featureFilePath, fileContent, 'utf-8');
}

export const generateFeatureBDDFile = async (features: Feature[], featureconfigfolder?: string) => {

    for (let feature of features) {
        let fileContent = featureTemplate(feature);
        for (let scenario of feature.scenarios) {
            fileContent = fileContent + scenarioTemplate(scenario);
            for (let step of scenario.steps) {
                for (let stepdef of step.stepDefinitions) {
                    fileContent = fileContent + `\t\t${stepdef.text}${os.EOL}`
                }
            }
            fileContent = fileContent + os.EOL;
        }
        createFeatureFile(feature, fileContent, featureconfigfolder);
    }
}