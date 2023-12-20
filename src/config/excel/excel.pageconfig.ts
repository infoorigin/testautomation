import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { getCellRowByText, getSheetNames, readEntityData } from './utils';
import { PageObject, PageElement, ActionElement, Navigation, NavigationType } from '../../page/pageobject';


const parsePageObject = (pageObject:any) => {
  const navigation:Navigation = {
    navigationType: NavigationType.URL,
    navigationValue : pageObject.url
  }
  const page:PageObject = {
    pageElements: [],
    actionElements: [],
    pageId:pageObject.pageId,
    pageName: pageObject.pageName,
    navigation
  }
  return page;
}

export const excelToPageConfig = async (workbookName: string) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(workbookName);
    const pageElements = readEntityData(workbook, 'pageElement') as PageElement[];
    const actionElements = readEntityData(workbook, 'actionElement') as ActionElement[];
    const pages = readEntityData(workbook, 'page').map(p => parsePageObject(p)) ;
    pages.forEach(p => {
      p.pageElements = pageElements.filter(a => a.pageId === p.pageId);
      p.actionElements = actionElements.filter(a => a.pageId === p.pageId);
    })
    return pages;
  }