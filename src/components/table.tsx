"use client"
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
import useSWR, { mutate } from 'swr';
import { dateParser } from '@/utils';

const fetcher = async (url: string) => {
 const response = await axios.get(url);
 return response.data;
};

const ActionButton = (props: ActionButtonProps) => {

  const handleDelete = async () => {
    await deleteUrl(props.data.id);
    toast.success("URL deleted successfully!");
    mutate("https://url-shortener-func.azurewebsites.net/api/urls");

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
 const { data: urls, error } = useSWR("https://url-shortener-func.azurewebsites.net/api/urls", fetcher);

 if (error) return <div>Failed to load</div>;
 if (!urls) return <LoadingSpinner />;

 const rowData = urls.map((item: Url) => ({
    ShortURL: "localhost:3000/" + item.shortUrl,
    LongURL: item.originalUrl,
    QRCode: "N/A",
    Clicks: item.clicks,
    Status: item.status == 0 ? "Active" : "Inactive",
    Date: dateParser(item.createdAt),
    Actions: {data: item},
    id:item.id
 }));

 return (
    <>
      <div className="ag-theme-quartz-dark" style={{ height: 525, width: 1104 }}>
        <AgGridReact
          pagination={true}
          paginationPageSize={50}
          paginationPageSizeSelector={[50, 100, 500]}
          columnDefs={[
            { field: "ShortURL", sortable: true, filter: true, width: 200},
            { field: "LongURL", sortable: true, filter: true, width: 200},
            { field: "QRCode", width: 100},
            { field: "Clicks", sortable: true, width: 100},
            { field: "Status", sortable: true, width: 100},
            { field: "Date", sortable: true, width: 200},
            { field: "Actions", cellRenderer: ActionButton }
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
