"use client"
import { deleteUrl, update } from '@/actions';
import copyIcon from '@/assets/copy.svg';
import deleteIcon from '@/assets/delete.svg';
import unlockIcon from '@/assets/lock-open.svg';
import lockIcon from '@/assets/lock.svg';
import { ActionButtonProps, TableProps, Url } from '@/interfaces';
import { dateParser, fetcher } from '@/utils';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from 'ag-grid-react';
import Image from 'next/image';
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR, { mutate } from 'swr';
import styles from './component.module.css';
import LoadingSpinner from './LoadingSpinner';

const API_URL = "https://url-shortener-func.azurewebsites.net/api/urls";

const ActionButton = (props: ActionButtonProps) => {
  const stylesByStatus = props.data.Status === "Active" ? styles.active : styles.inactive;

  const handleDelete = async () => {
    await deleteUrl(props.data.id);
    toast.success("URL deleted successfully!");
    mutate(API_URL);
  }

  const handleUpdate = async () => {
    const status = props.data.Status === "Active" ? "Inactive" : "Active";
    await update(props.data.id, status);
    toast.success("URL updated successfully!");
    mutate(API_URL);
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(props.data.ShortURL);
    toast.info('URL copied to clipboard!');
  }

  return (
    <div className={styles.buttonContainer}>

      {props.isLogged && (
        <>
          <button className={`${styles.buttonBase} ${styles.deleteButton}`} onClick={handleDelete}>
            <Image src={deleteIcon} alt="delete" width={16} height={16} />
          </button>

          <button className={`${styles.buttonBase} ${styles.editButton} ${stylesByStatus}`} onClick={handleUpdate}>
            {
              props.data.Status === "Active" 
                ? 
                <Image src={lockIcon} alt="lock" width={16} height={16} /> 
                : 
                <Image src={unlockIcon} alt="unlock" width={16} height={16} />
            }
          </button>
        </>
      )}

        <button className={`${styles.buttonBase} ${styles.copyButton}`} onClick={handleCopy}>
                    <Image src={copyIcon} alt="copy" width={16} height={16} />
        </button>

    </div>
  );
}


const Table = ({isLogged}: TableProps) => {
 const { data: urls, error } = useSWR(API_URL, fetcher);

 if (error) return <div className={styles.description}>Failed to load</div>;
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
            { field: "Actions", cellRenderer: (props: any) => <ActionButton {...props} isLogged={isLogged} /> }
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
