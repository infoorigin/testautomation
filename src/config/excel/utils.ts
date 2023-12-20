import ExcelJS, { ValueType } from 'exceljs';
import { appConfig } from '..';


export const readEntityData = (workbook: ExcelJS.Workbook, entityType: string) => {
  const excelConfig = appConfig.excelConfig;
  const sheetConfig = excelConfig?.find(e => e.entityType === entityType);
  if (!sheetConfig) {
    throw new Error(`EntityType :${entityType} is not present in excel.config.json`)
  }
  const worksheet = workbook.worksheets.find(ws => ws.name.trim().toLowerCase() === sheetConfig.sheetName.trim().toLowerCase())
  const entityData: any[] = [];
  worksheet?.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const data = {} as any;
      row.eachCell((cell, colNumber) => {
        const colconfig = sheetConfig.columns.find(c => c.position === colNumber);
        if (colconfig) {
          const cellType = cell.type;
          switch(cellType){
            case ValueType.Hyperlink :
              data[colconfig.key] = cell.hyperlink;
            case ValueType.Number :
              data[colconfig.key] = cell.value;
            default :
              data[colconfig.key] = cell.text ? cell.text.trim():'';  
          }
          
        }
      });
      entityData.push(data)
    }
  });
  return entityData;
}

export const getSheetNames = async (workbook: ExcelJS.Workbook) => {
  let sheetNames: any = [];
  workbook.eachSheet(function (worksheet: any, sheetId: any) {
    sheetNames.push(worksheet._name)
  })
  return sheetNames
}

/**
 * This function work like control-F and return the matchin row number
 * @author Info Origin
 * @param worksheet 
 * @param name 
 * @returns Row number
 */
export const getCellRowByText = async (worksheet: ExcelJS.Worksheet | undefined, name: string) => {
  let match;
  worksheet?.eachRow({ includeEmpty: false }, (row: any) => row.eachCell((cell: any) => {
    if (cell._value.model.value == name) {
      match = cell._row._number;
    }
  }))
  return match
}