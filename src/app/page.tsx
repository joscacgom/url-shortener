"use client";
import styles from "./page.module.css";
import { InputUrl, Navbar, Table, Footer } from "@/components";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/config/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

export const msalInstance = new PublicClientApplication(msalConfig);

export default function Home() {
  return (
    <MsalProvider instance={msalInstance}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shorten your links</h1>
          <p className={styles.description}>
            Generate short URLs for your long URLs with ease.
          </p>
        </div>
        <div className={styles.content}>
          <AuthenticatedTemplate>
            <InputUrl />
            <Table  isLogged />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
          <p className={styles.description}>
           <span className={styles.bold}>Sign in</span> to shorten your links. This is an example list of shortened URLs.
          </p>
           <Table isLogged={false} />
          </UnauthenticatedTemplate>
        </div>
      </main>
      <Footer />
    </MsalProvider>
  );
}
