"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styles from './component.module.css';
import deleteUrl from '../actions/deleteShortURL';
import { LoadingSpinner } from './loadingSpinner';
import { ActionButtonProps, RowData, Url } from '@/interfaces';
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ActionButton = (props: ActionButtonProps) => {

  const handleDelete = async () => {
    await deleteUrl(props.data.id);
    toast.success("URL deleted successfully!");
    await props.onDelete();
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(props.data.ShortURL);
    toast.info('URL copied to clipboard!');
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

  const fetchData = async () => {
    try {
      const response = await axios.get("https://url-shortener-func.azurewebsites.net/api/urls");
      const data = response.data.map((item: Url) => ({
        ShortURL: "localhost:3000/" + item.shortUrl,
        LongURL: item.originalUrl,
        QRCode: "N/A",
        Clicks: item.clicks,
        Status: item.status == 0 ? "Active" : "Inactive",
        Date: item.createdAt.split("T")[0] + " " + item.createdAt.split("T")[1].split(".")[0],
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

  const handleDelete = async () => {
    await fetchData();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="ag-theme-quartz-dark" style={{ height: 525, width: 1405 }}>
        <AgGridReact
          pagination={true}
          paginationPageSize={50}
          paginationPageSizeSelector={[50, 100, 500]}
          columnDefs={[
            { field: "ShortURL" },
            { field: "LongURL" },
            { field: "QRCode" },
            { field: "Clicks"},
            { field: "Status" },
            { field: "Date" },
            { field: "Actions", cellRenderer: ActionButton, cellRendererParams: { onDelete: handleDelete } }
          ]}
          rowData={rowData}
        />
      </div>
      <ToastContainer position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
    </>

  );
}

export default Table;
