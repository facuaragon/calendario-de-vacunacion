import styles from "./styles.module.css";
import Link from "next/link";
export default function CardEtapaDeVida({ etapa }) {
  return (
    <>
      <Link className={styles.link} href={`/etapasDeVida/${etapa.page}`}>
        <div className={styles.container}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url("/EtapasDeVida/${etapa.image}")`,
            }}
          ></div>
          <div className={styles.title}>{etapa.title}</div>
        </div>
      </Link>
    </>
  );
}
