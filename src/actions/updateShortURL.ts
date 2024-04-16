'use server'

import { useMsal } from '@azure/msal-react'
import axios from 'axios'

async function update (id: string, status: string): Promise<any> {

  const {instance} = useMsal()
  const headers = {
    Authorization: `Bearer ${instance.getAccountByLocalId(localStorage.getItem('userId')!)?.idToken}`
  }

  const response = await axios.put(`https://url-shortener-func.azurewebsites.net/api/urls/${id}`, { status }, { headers })
  return response.data
}

export default update
