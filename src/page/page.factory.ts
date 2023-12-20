import { PageObject } from "./pageobject";
import * as fs from 'fs';

export const createPageObjects = (input:string, inputType:"jsonFile" | "excelFile" |"string") : PageObject[] => {
    switch(inputType) {
        case 'jsonFile':
            const fileContent = fs.readFileSync(input, 'utf8');
            const pageObjects:PageObject[]  =  JSON.parse(fileContent);
            return pageObjects
        case 'excelFile':
        case 'string':
        default :
            throw new Error(inputType+" Not Implemented")

    }
}

export const testInit = () => {
    const pageconfigfile = process.env.PAGECONFIG;
    const pageObjects = createPageObjects((pageconfigfile?pageconfigfile:''),"jsonFile");
    return{
        pageObjects
    }
}
