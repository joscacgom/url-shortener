"use client";
import Link from "next/link";
import Button from "./Button";
import styles from "./component.module.css";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { useState } from "react";
import { authScopes } from "@/config/authConfig";
import AccountDetails from "./AccountDetails";

const Navbar = () => {
    const { instance } = useMsal();
    const [accountDetails, setAccountDetails] = useState(() => {
        return localStorage.getItem("accountDetails") || "";
    });

    const handleLogin = () => {
        instance.loginPopup(authScopes)
            .then(response => {
                if (response && response.account && response.account.name) {
                    setAccountDetails(response.account.name);
                    localStorage.setItem("accountDetails", response.account.name);
                    instance.setActiveAccount(response.account);
                } else {
                    console.error("Invalid response format:", response);
                }
            })
            .catch(e => {
                console.error("Error logging in:", e);
            });
    };
    
    const handleLogout = () => {
        instance.logoutPopup().catch(e => {
            console.error(e);
        }).then(() => {
            setAccountDetails("");
            localStorage.removeItem("accountDetails");
        });
    };

    return (
        <nav className={styles.navbar}>
            <Link href={"/"} style={{textDecoration:'none'}}>
                <h1 className={styles.navbarTitle}>Short.link</h1>
            </Link>
            <div className={styles.buttonContainer}>
                <UnauthenticatedTemplate>
                    <Button text="Login" type="signUp" handleClick={handleLogin}/>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                    <AccountDetails name={accountDetails}/>
                    <Button text="Logout" type="login" handleClick={handleLogout}/>
                </AuthenticatedTemplate>
            </div>
        </nav>
    );
};

export default Navbar;
