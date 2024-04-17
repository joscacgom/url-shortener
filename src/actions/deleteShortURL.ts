'use server'
import axios from 'axios'

async function deleteUrl (id: string): Promise<any> {
  const response = await axios.delete(`https://url-shortener-func.azurewebsites.net/api/urls/${id}`)
  return response.data
}

export default deleteUrl
