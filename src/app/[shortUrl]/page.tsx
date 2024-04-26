import axios from 'axios'
import { permanentRedirect } from 'next/navigation'

export default async function RedirectionToOriginalUrl ({ params }: { params: { shortUrl: string } }) {
  const fetchData = async (): Promise<string | undefined> => {
    try {
      const response = await axios.get(`https://url-shortener-func.azurewebsites.net/api/urlsByShortUrl/${params.shortUrl}`)
      const data = response.data
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const redirectUrl = await fetchData()
  return permanentRedirect(redirectUrl ?? '/')
}
