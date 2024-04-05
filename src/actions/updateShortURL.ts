"use server"

import axios from "axios";

async function update(id: string) {
    const response = await axios.put(`https://url-shortener-func.azurewebsites.net/api/urls/${id}`);
    return response.data;
}

export default update;