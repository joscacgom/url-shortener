/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { deleteUrl, update } from '@/actions'
import copyIcon from '@/assets/copy.svg'
import deleteIcon from '@/assets/delete.svg'
import unlockIcon from '@/assets/lock-open.svg'
import lockIcon from '@/assets/lock.svg'
import { mutate } from 'swr'
import { toast } from 'react-toastify'
import Image from 'next/image'
import styles from './styles.module.css'
import { type ActionButtonProps } from '@/interfaces'
import { useEffect } from 'react'

const ActionButton = (props: ActionButtonProps): JSX.Element => {
  const stylesByStatus = props.data.Status === 'Active' ? styles.active : styles.inactive

  const handleDelete = async (): Promise<void> => {
    await deleteUrl(props.data.id)
    toast.success('URL deleted successfully!')
    mutate('api/url')
  }

  const handleUpdate = async (): Promise<void> => {
    const status = props.data.Status === 'Active' ? 'Inactive' : 'Active'
    await update(props.data.id, status)
    toast.success('URL updated successfully!')
    mutate('api/url')
  }

  const handleCopy = (): void => {
    navigator.clipboard.writeText(props.data.ShortURL)
    toast.info('URL copied to clipboard!')
  }

  useEffect(() => {
    mutate('api/url')
  }, [localStorage.getItem('userId')])

  return (
      <div className={styles.buttonContainer}>

        {props.isLogged && (
          <>
            <button className={`${styles.buttonBase} ${styles.deleteButton}`} onClick={handleDelete}>
              <Image src={deleteIcon} alt="delete" width={16} height={16} />
            </button>

            <button className={`${styles.buttonBase} ${styles.editButton} ${stylesByStatus}`} onClick={handleUpdate}>
              {
                props.data.Status === 'Active'
                  ? <Image src={lockIcon} alt="lock" width={16} height={16} />
                  : <Image src={unlockIcon} alt="unlock" width={16} height={16} />
              }
            </button>
          </>
        )}

          <button className={`${styles.buttonBase} ${styles.copyButton}`} onClick={handleCopy}>
                      <Image src={copyIcon} alt="copy" width={16} height={16} />
          </button>

      </div>
  )
}

export default ActionButton
