import Image from "next/image";
import styles from "./Home.module.css";
import LoginComponent from "@/components/login.component";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LoginComponent />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
