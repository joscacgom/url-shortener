

import styles from "./page.module.css";
import { InputUrl } from "./_components/inputUrl";
import Table from "./_components/table";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>URL Shortener</h1>
      <InputUrl />
      <Suspense fallback={<p>Loading</p>}>
        <Table />
      </Suspense>
    </main>
  );
}
