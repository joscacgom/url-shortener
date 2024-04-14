/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'
import { useState } from 'react'
import Button from '../button'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './styles.module.css'
import { mutate } from 'swr'
import { isValidUrl } from '@/utils'
import { create } from '@/actions'

const InputUrl = (): JSX.Element => {
  const [url, setUrl] = useState('')

  const handleClick = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!url) {
      toast.error('URL cannot be empty')
      return
    }

    if (!isValidUrl(url)) {
      toast.error('Invalid URL')
      return
    }

    try {
      await create({ originalUrl: url })
      toast.success('URL created successfully!')
      mutate('https://url-shortener-func.azurewebsites.net/api/urls')
    } catch (error) {
      console.error('Error creating URL:', error)
      toast.error('Failed to create URL')
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value)
  }

  return (
        <>
            <form onSubmit={handleClick} className={styles.formContainer}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="🔗 https://www.example.com"
                    id="url"
                    name="url"
                    onChange={handleOnChange}
                />
                <Button text="Create" type="submit" />
            </form>
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

export default InputUrl
