"use server"
import axios from "axios";

interface Url {
    originalUrl: string;
}

async function create(url: Url) {
    try{
        const response = await axios.post("https://url-shortener-func.azurewebsites.net/api/urls", url);
        return response.data;
    } catch (error) {
        console.error("Error creating short URL", error);
        return url;
    }
}

export default create;