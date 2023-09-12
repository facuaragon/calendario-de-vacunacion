import Image from "next/image";
import styles from "./page.module.css";

import CalendarioDeVacunacion from "@/components/CalendarioDeVacunacion";

export default function Home() {
  return (
    <>
      <div className={styles.appContainer}>
        <CalendarioDeVacunacion />
      </div>
    </>
  );
}
