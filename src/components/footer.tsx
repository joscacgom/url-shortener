import React from "react";
import styles from "./component.module.css";
import Link from "next/link";

export const Footer = () => {
   
    return (
        <footer className={styles.footer}>
            <p><Link href={""}>Register Now</Link> to enjoy full features</p>
        </footer>
    );
};
