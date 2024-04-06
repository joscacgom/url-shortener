"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styles from './component.module.css';
import deleteUrl from '../../actions/deleteShortURL';
import { LoadingSpinner } from './loadingSpinner';

interface RowData {
  ShortURL: string;
  LongURL: string;
  QRCode?: string;
  Clicks?: number;
  Status: string;
  Date: string;
  Actions: any;
  id: string;
}

interface ActionButtonProps {
  data: RowData;
  onDelete: () => void;
}

const ActionButton = (props: ActionButtonProps) => {

  const handleDelete = async () => {
    await deleteUrl(props.data.id);
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(props.data.ShortURL);
  }

  return (
    <div className={styles.buttonContainer}>
        <button className={`${styles.buttonBase} ${styles.deleteButton}`} onClick={handleDelete}>x</button>
        <button className={`${styles.buttonBase} ${styles.copyButton}`} onClick={handleCopy}>🔗</button>
    </div>
  );
}

const Table = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [colDefs, setColDefs] = useState<{ field: keyof RowData, cellRenderer?: any }[]>([
    { field: "ShortURL" },
    { field: "LongURL" },
    { field: "QRCode" },
    { field: "Clicks"},
    { field: "Status" },
    { field: "Date" },
    { field: "Actions", cellRenderer: ActionButton }
  ]);


  const pagination = true;
  const paginationPageSize = 50;
  const paginationPageSizeSelector = [50, 100, 500];

  const fetchData = async () => {
    try {
      const response = await axios.get("https://url-shortener-func.azurewebsites.net/api/urls");
      const data = response.data.map((item: any) => ({
        ShortURL: "localhost:3000/" + item.shortUrl,
        LongURL: item.originalUrl,
        QRCode: "📷",
        Clicks: 3,
        Status: "Active",
        Date: new Date().toLocaleDateString(),
        Actions: {data: item},
        id:item.id
      }));
      setRowData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="ag-theme-quartz-dark" style={{ height: 525, width: 1405 }}>
      <AgGridReact
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        columnDefs={colDefs}
        rowData={rowData}
        onGridReady={() => setLoading(false)}
        onModelUpdated={() => setLoading(false)}
      />
    </div>
  );
}

export default Table;

