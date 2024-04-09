import styles from "./page.module.css";
import { Navbar, Footer } from "@/components";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>404 Not Found</h1>
          <p className={styles.description}>
            The page you are looking for does not exist
          </p>
        </div>
      </main>
      <Footer />
    </>
    
  );
}
