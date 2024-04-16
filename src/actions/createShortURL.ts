'use server'
import { useMsal } from '@azure/msal-react'
import axios from 'axios'

interface Url {
  originalUrl: string
}

async function create (url: Url): Promise<any> {
  const { instance } = useMsal()

  const headers = {
    Authorization: `Bearer ${instance.getAccountByLocalId(localStorage.getItem('userId')!)?.idToken}`
  }

  try {
    const response = await axios.post('https://url-shortener-func.azurewebsites.net/api/urls', url, { headers })
    return response.data
  } catch (error) {
    console.error('Error creating short URL', error)
    return url
  }
}

export default create
