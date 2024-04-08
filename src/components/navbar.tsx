"use client"
import Link from "next/link";
import { Button } from "./button";
import styles from "./component.module.css";

export const Navbar = () => {
   
    return (
        <nav className={styles.navbar}>
            <Link href={"/"} style={{textDecoration:'none'}}>
                <h1 className={styles.navbarTitle}>Short.link</h1>
            </Link>
            <div className={styles.buttonContainer}>
                <Link href={"/auth/login"}>
                    <Button text="Login" type="login"/>
                </Link>
                <Link href={"/auth/sign-up"}>
                    <Button text="Sign Up" type="signUp"/>
                </Link>
            </div>
        </nav>
    );
};
