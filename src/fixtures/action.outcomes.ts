import { Outcome, OutcomeType } from "../page/pageobject";
import { PageWorld } from "../steps/world";


export const executeOutcome = async (outcome:Outcome, world:PageWorld) => {
    switch(outcome.outcomeType){
        case OutcomeType.NAVIGATION :
            const pageName = outcome.outcomeValue;
            world.setCurrentPage(pageName)
            break;
        default :
            throw("Unsupported outcome type "+outcome.outcomeType); 
    }
}