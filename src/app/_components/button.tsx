import React from "react";
import styles from "./component.module.css";

interface ButtonProps {
    text: string;
    handleClick: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    type?: "submit" | "edit" | "delete";
}

export const Button = ({ text, handleClick, type }: ButtonProps) => {
    const buttonClass = type === "submit" ? styles.submitButton : type === "edit" ? styles.editButton : styles.deleteButton;

    return (
        <button className={`${styles.buttonBase} ${buttonClass}`} onClick={(e)=>handleClick}>{text}</button>
    );
};

