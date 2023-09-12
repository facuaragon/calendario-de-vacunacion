import styles from "./styles.module.css";
import SignIn from "../../sign-in/page";

export default function Success() {
  return (
    <>
      <div className={styles.pageContainer}>
        <h3>Usuario creado con Exito</h3>
        <h3>Por favor inicie sesión</h3>
        <SignIn />
      </div>
    </>
  );
}
