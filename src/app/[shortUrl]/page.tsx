import axios from "axios";
import { permanentRedirect } from "next/navigation";

export default async function RedirectionToOriginalUrl({ params }: { params: { shortUrl: string } }) {

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://url-shortener-func.azurewebsites.net/api/urlsByShortUrl/0i3BHO`);
            const data = response.data;
            return data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching data:", error);
        }
    };

    const redirectUrl = await fetchData();
    return permanentRedirect("https://"+redirectUrl);
}
