import ExcelJS from 'exceljs';
import { readEntityData } from './utils';
import { Feature, Scenario, Step, StepDefinition } from '../../feature/feature.type';

export const excelToFeature = async (workbookName: string) => {
    
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(workbookName);
    const stepdefinitions = readEntityData(workbook, 'stepdefinition') as StepDefinition[];
    const steps = readEntityData(workbook, 'step') as Step[];
    steps.forEach(s => {
      s.stepDefinitions = stepdefinitions.filter(sd => sd.stepId === s.id).sort((s1,s2) => s1.seqId - s2.seqId);
    })
    const scenarios = readEntityData(workbook, 'scenario') as Scenario[];
    scenarios.forEach(s => {
      s.steps = steps.filter(sd => sd.scenarioId === s.id).sort((s1,s2) => s1.seqId - s2.seqId);;
    })
    const features = readEntityData(workbook, 'feature') as Feature[];
    features.forEach(f => {
      f.scenarios = scenarios.filter(s => s.featureId === f.id).sort((s1,s2) => s1.seqId - s2.seqId);
    })
    return features;
  }