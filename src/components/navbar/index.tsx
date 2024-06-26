'use client'
import Link from 'next/link'
import Button from '../button'
import styles from './styles.module.css'
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { useState } from 'react'
import { authScopes } from '@/config/authConfig'
import AccountDetails from '../accountDetails'

const Navbar = (): JSX.Element => {
  const { instance } = useMsal()
  const [accountDetails, setAccountDetails] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('accountDetails') : ''
  })

  const handleLogin = (): void => {
    instance.loginPopup(authScopes)
      .then(response => {
        if (response && response.account?.name && typeof window !== 'undefined') {
          setAccountDetails(response.account.name)
          localStorage.setItem('accountDetails', response.account.name)
          instance.setActiveAccount(response.account)

          const userId = response.account.localAccountId
          localStorage.setItem('userId', userId)
        } else {
          console.error('Invalid response format:', response)
        }
      })
      .catch(e => {
        console.error('Error logging in:', e)
      })
  }

  const handleLogout = (): void => {
    instance.logoutPopup().catch(e => {
      console.error(e)
    }).then(() => {
      setAccountDetails('')
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accountDetails')
        localStorage.removeItem('userId')
      }
    })
  }

  return (
        <nav className={styles.navbar}>
            <Link href={'/'} style={{ textDecoration: 'none' }}>
                <h1 className={styles.navbarTitle}>Short.link</h1>
            </Link>
            <div className={styles.buttonContainer}>
                <UnauthenticatedTemplate>
                    <Button text="Login" type="signUp" handleClick={handleLogin}/>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                    <AccountDetails name={accountDetails}/>
                    <Button text="Logout" type="login" handleClick={handleLogout}/>
                </AuthenticatedTemplate>
            </div>
        </nav>
  )
}

export default Navbar
