import React from "react";
import styles from "./component.module.css";
import { AccountDetailsProps } from "@/interfaces";

const AccountDetails = ({name}: AccountDetailsProps) => {

    return (
        <div className={styles.AccountDetailsContainer}>
           <span className={styles.AccountDetailsMessage}> Welcome </span>
           <p className={styles.AccountDetailsName}>{name}</p>
        </div>
    );
};

export default AccountDetails;
