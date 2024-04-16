'use server'
import { useMsal } from '@azure/msal-react'
import axios from 'axios'

async function deleteUrl (id: string): Promise<any> {
  const { instance } = useMsal()

  const headers = {
    Authorization: `Bearer ${instance.getAccountByLocalId(localStorage.getItem('userId')!)?.idToken}`
  }
  const response = await axios.delete(`https://url-shortener-func.azurewebsites.net/api/urls/${id}`, { headers })
  return response.data
}

export default deleteUrl
