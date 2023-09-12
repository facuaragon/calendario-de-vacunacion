"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import styles from "./userLogged.module.css";
import Image from "next/image";
import Link from "next/link";

export default function UserLogged({ user }) {
  const session = useSession();
  const { data, status } = session;
  const isAuth = status === "authenticated";
  console.log(session);
  const logOut = () => {
    signOut();
  };
  const logInAdmin = () => {
    signIn("google");
  };

  return (
    <div className={styles.container}>
      {isAuth ? (
        <>
          {/* <Image
            src={user.image}
            width={40}
            height={40}
            className={styles.image}
            alt={user.name}
          />
          <div>
            <p className={styles.name}>{user.name}</p>
            <div className={styles.options}>
              <div className={styles.sign} onClick={logOut}>
                Log Out
              </div>
            </div>
          </div> */}
          <div className={styles.sign} onClick={logOut}>
            Log Out
          </div>
        </>
      ) : (
        <>
          <div className={styles.sign}>
            <Link href={"/api/auth/sign-in"}>Ingresar</Link>
          </div>
          <div className={styles.signUp}>
            <Link href={"/api/auth/sign-up"}>Registrarse</Link>
          </div>
        </>
      )}
    </div>
  );
}
