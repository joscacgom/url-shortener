"use client"
import { Button } from "./button";
import styles from "./component.module.css";

export const Navbar = () => {
   
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.navbarTitle}>Short.link</h1>
            <div className={styles.buttonContainer}>
                <Button text="Login" type="login" handleClick={() => {}}/>
                <Button text="Sign Up" type="signUp" handleClick={() => {}}/>
            </div>
        </nav>
    );
};
