import axios from "axios";

export const isValidUrl = (url: string) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
};

export const dateParser = (date: string) => {
  return date.split("T")[0] + " " + date.split("T")[1].split(".")[0];
}

export const fetcher = async (url: string) => {
 const response = await axios.get(url);
 return response.data;
};