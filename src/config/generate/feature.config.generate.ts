import path from "path";
import * as fs from 'fs';
import { Feature } from "../../feature/feature.type";

export const generateFeatureConfigFile = async (features: Feature[], configFilePath?:string) => {

    const pageFilePath = configFilePath? configFilePath : path.join(__dirname, '../../..', "data", "featureconfig.json");
    if (fs.existsSync(pageFilePath)) {
        fs.unlinkSync(pageFilePath);
    }
    fs.writeFileSync(pageFilePath, JSON.stringify(features, null, 2), 'utf-8');
    
}