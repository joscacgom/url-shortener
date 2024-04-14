import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

const Footer = (): JSX.Element => {
  return (
        <footer className={styles.footer}>
            <p><Link href={'#'}>Register Now</Link> to enjoy full features.</p>
        </footer>
  )
}

export default Footer
