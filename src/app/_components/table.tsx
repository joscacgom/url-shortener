"use client"

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { useState } from 'react';
import { Button } from './button';
import styles from './component.module.css';

interface RowData {
 ShortURL: string;
 LongURL: string;
 Actions: any;
}

const ActionButton = (props:any) => {

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Edit button clicked");
    }

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Delete button clicked");
    }
    return (
        <div className={styles.buttonContainer}>
            <Button text="Edit" handleClick={handleEdit} type="edit"/>
            <Button text="Delete" handleClick={handleDelete} type="delete"/>
        </div>
    );
}

const Table = () => {
    const [rowData, setRowData] = useState<RowData[]>([
        { ShortURL: "short.io/35esgg", LongURL: "www.google.com", Actions: ActionButton},
        { ShortURL: "short.io/35esgg", LongURL: "www.google.com", Actions: ActionButton},
      ]);
      
      const [colDefs, setColDefs] = useState<{ field: keyof RowData, cellRenderer?: any}[]>([
        { field: "ShortURL" },
        { field: "LongURL" },
        { field: "Actions", cellRenderer: ActionButton}
      ]);

      const pagination = true;
      const paginationPageSize = 50;
      const paginationPageSizeSelector = [50, 100, 500];

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: 600 }}>
            <AgGridReact
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                columnDefs={colDefs}
                rowData={rowData}
            />
        </div>
    );
}

export default Table;
