import styles from "./page.module.css";
import { InputUrl } from "./_components/inputUrl";
import Table from "./_components/table";
import { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shorten your links</h1>
          <p className={styles.description}>
            Generate short URLs for your long URLs
          </p>
        </div>
        <InputUrl />
        <Suspense fallback={<p>Loading</p>}>
          <Table />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
