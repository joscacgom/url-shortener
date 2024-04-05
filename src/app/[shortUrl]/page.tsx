"use client";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import navigate from "@/actions/redirectTo";

export default function RedirectionToOriginalUrl() {
    const { shortUrl } = useParams();
    const [originalUrl, setOriginalUrl] = useState("");
    const [countdown, setCountdown] = useState(3);
    const timerRef = useRef<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://url-shortener-func.azurewebsites.net/api/urlsByShortUrl/${shortUrl}`);
                const data = response.data;
                setOriginalUrl(data);

                if (!timerRef.current) {
                    const timerId = setInterval(() => {
                        setCountdown((prevCount) => prevCount - 1); 
                    }, 1000); 

                    timerRef.current = timerId;

                    setTimeout(async () => {
                        clearInterval(timerId);
                    }, 3000);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (shortUrl) {
            fetchData();
        }
        
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [shortUrl]);

    return (
        <>
            Redirecting to {originalUrl} in {countdown} seconds...
        </>
    );
}
