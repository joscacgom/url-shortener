import styles from "./page.module.css";
import { InputUrl, Navbar, Table, Footer } from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shorten your links</h1>
          <p className={styles.description}>
            Generate short URLs for your long URLs with ease
          </p>
        </div>
        <div className={styles.content}>
          <InputUrl />
          <Table />
        </div>
      </main>
      <Footer />
    </>
  );
}
