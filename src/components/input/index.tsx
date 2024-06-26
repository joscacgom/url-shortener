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
      toast.error('Must start with https://www.')
      return
    }

    try {
      await create({ originalUrl: url, userId: typeof window !== 'undefined' ? localStorage.getItem('userId') : '' })
      toast.success('URL created successfully!')
      mutate('api/url')
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
