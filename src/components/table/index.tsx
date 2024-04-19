/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { type TableProps, type Url } from '@/interfaces'
import { dateParser, fetcher } from '@/utils'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact } from 'ag-grid-react'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useSWR from 'swr'
import styles from './styles.module.css'
import LoadingSpinner from '../loadingSpinner'
import ActionButton from './actionButtons'

const API_URL = {
  notLogged: 'https://url-shortener-func.azurewebsites.net/api/urls',
  logged: 'https://url-shortener-func.azurewebsites.net/api/urlsByUserId/'
}

const Table = ({ isLogged }: TableProps): JSX.Element => {
  const { data: urls, error } = useSWR('api/url', async () => await fetcher(isLogged ? API_URL.logged + localStorage.getItem('userId') : API_URL.notLogged))
  if (error) return <div className={styles.description}>Failed to load</div>
  if (!urls) return <LoadingSpinner />

  const rowData = urls.map((item: Url) => ({
    ShortURL: 'https://shortlinkapp.azurewebsites.net/' + item.shortUrl,
    LongURL: item.originalUrl,
    QRCode: 'N/A',
    Clicks: item.clicks,
    Status: item.status === 0 ? 'Active' : 'Inactive',
    Date: dateParser(item.createdAt),
    Actions: { data: item },
    id: item.id
  }))

  return (
    <>
      <div className={`${styles.tableContainer} ag-theme-quartz-dark`}>
        <AgGridReact
          pagination={true}
          paginationPageSize={50}
          paginationPageSizeSelector={[50, 100, 500]}
          columnDefs={[
            { field: 'ShortURL', sortable: true, filter: true, width: 200 },
            { field: 'LongURL', sortable: true, filter: true, width: 200 },
            { field: 'QRCode', width: 100 },
            { field: 'Clicks', sortable: true, width: 100 },
            { field: 'Status', sortable: true, width: 100 },
            { field: 'Date', sortable: true, width: 200 },
            { field: 'Actions', cellRenderer: (props: any) => <ActionButton {...props} isLogged={isLogged} /> }
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
  )
}

export default Table
