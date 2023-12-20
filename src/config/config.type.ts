
export type ExcelConfig = {
    entityType: string,
    sheetName: string,
    columns: ExcelConfigColumn[]

}

export type ExcelConfigColumn = {
    position: number,
    key: string
}
