import React from "react";
import styles from "./component.module.css";
import { ButtonProps } from "@/interfaces";

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
