'use server'

import axios from 'axios'

async function update (id: string, status: string): Promise<any> {
  const response = await axios.put(`https://url-shortener-func.azurewebsites.net/api/urls/${id}`, { status })
  return response.data
}

export default update
