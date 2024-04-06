"use client"
import create from "@/actions/createShortURL";
import React, { useState } from "react";
import { Button } from "./button";
import styles from "./component.module.css";

export const InputUrl = () => {
    const [url, setUrl] = useState("");

    const handleClick = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!url) return;
        const response = await create({originalUrl: url});
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    }

    return (
        <form onSubmit={handleClick} className={styles.formContainer}>
            <input type="text" className={styles.input} placeholder="🔗 Enter long URL" id="url" name="url" onChange={handleOnChange}/>
            <Button text="Create" handleClick={handleClick} type="submit"/>
        </form>
    );
};
