"use client"

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { useEffect, useState } from 'react';
import { Button } from './button';
import styles from './component.module.css';
import axios from 'axios';

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
    const [rowData, setRowData] = useState<RowData[]>([]);
      
      const [colDefs, setColDefs] = useState<{ field: keyof RowData, cellRenderer?: any}[]>([
        { field: "ShortURL" },
        { field: "LongURL" },
        { field: "Actions", cellRenderer: ActionButton}
      ]);

      const pagination = true;
      const paginationPageSize = 50;
      const paginationPageSizeSelector = [50, 100, 500];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://url-shortener-func.azurewebsites.net/api/urls");
            const data = response.data.map((item: any) => ({
                ShortURL: "localhost:3000/" + item.shortUrl,
                LongURL: item.originalUrl,
                Actions: ActionButton
              }));
            setRowData(data);
          } catch (error) {
            // Handle errors
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      
      }, []);
      

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
