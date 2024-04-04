"use server"


async function deleteUrl(prevState: any, url: string) {
    const response = await fetch("http://localhost:3000/api/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    });
    const data = await response.json();
    return data;
}

export default deleteUrl;