import React from "react";
import styles from "./component.module.css";

interface ButtonProps {
    text: string;
    handleClick: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    type: "submit" | "edit" | "delete" | "signUp" | "login" | "copy";
}

const typeToClassName: Record<ButtonProps['type'], string> = {
    submit: styles.submitButton,
    edit: styles.editButton,
    delete: styles.deleteButton,
    signUp: styles.signupButton,
    login: styles.loginButton,
    copy: styles.copyButton
};

export const Button = ({ text, handleClick, type = "submit" }: ButtonProps) => {
    return (
        <button className={`${styles.buttonBase} ${typeToClassName[type]}`} onClick={(e) => handleClick}>{text}</button>
    );
};
