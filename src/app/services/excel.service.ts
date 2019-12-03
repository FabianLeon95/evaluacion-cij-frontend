import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {utils, WorkBook, WorkSheet, write} from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() {
  }

  public exportAsExcel(json: any[], fileName: string): void {
    const worksheet: WorkSheet = utils.json_to_sheet(json);
    const workbook: WorkBook = {Sheets: {data: worksheet}, SheetNames: ['data']};
    const excelBuffer: any = write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcel(excelBuffer, fileName);
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
  }
}
