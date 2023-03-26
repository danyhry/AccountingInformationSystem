import * as XLSX from "xlsx";

const getFileName = (name?: string) => {
  let sheetName = name || "ExportResult";
  let fileName = `${sheetName}`;
  return {
    sheetName,
    fileName
  };
};

export class TableUtils {
  static exportTableToExcel(tableId: string, name?: string) {
    let {sheetName, fileName} = getFileName(name);
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: sheetName
    });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  static exportFilteredTableToExcel(tableId: string, name?: string) {
    let {sheetName, fileName} = getFileName(name);
    let targetTableElm = document.getElementById(tableId);

    // @ts-ignore
    let columnDefs = targetTableElm.querySelectorAll('ng-container[matColumnDef]');

    // Exclude "action" column definition from array
    let filteredDefs = Array.from(columnDefs).filter(def => def.getAttribute('matColumnDef') !== 'action');


    let sheetOptions: XLSX.Table2SheetOpts = {
      sheet: sheetName,
      // @ts-ignore
      column: filteredDefs.map(def => ({header: def.querySelector('mat-header-cell').innerText, key: def.getAttribute('matColumnDef')}))
    };

    let wb = XLSX.utils.table_to_book(targetTableElm, sheetOptions);

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
