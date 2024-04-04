"use server"
import axios from "axios";

async function create(url: string) {
    try{
        const response = await axios.post("http://localhost:3000/api/shorten", {url});
        return response.data;
    } catch (error) {
        console.error("Error creating short URL", error);
        return url;
    }
}

export default create;