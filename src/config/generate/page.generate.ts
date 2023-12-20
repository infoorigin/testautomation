import { PageObject } from "../../page/pageobject";
import path from "path";
import * as fs from 'fs';

export const generatePageFile = async (pages: PageObject[], configFilePath?:string) => {

    const pageFilePath = configFilePath? configFilePath : path.join(__dirname, '../../..', "data", "pageconfig.json");
    if (fs.existsSync(pageFilePath)) {
        fs.unlinkSync(pageFilePath);
    }
    fs.writeFileSync(pageFilePath, JSON.stringify(pages, null, 2), 'utf-8');
    
}