import React from 'react'
import styles from './styles.module.css'
import { type AccountDetailsProps } from '@/interfaces'

const AccountDetails = ({ name }: AccountDetailsProps): JSX.Element => {
  return (
        <div className={styles.AccountDetailsContainer}>
           <span className={styles.AccountDetailsMessage}> Welcome </span>
           <p className={styles.AccountDetailsName}>{name}</p>
        </div>
  )
}

export default AccountDetails
