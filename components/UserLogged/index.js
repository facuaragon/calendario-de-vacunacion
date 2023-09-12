"use client";
import { signIn, signOut } from "next-auth/react";
import styles from "./userLogged.module.css";
import Image from "next/image";
import Link from "next/link";

export default function UserLogged({ user }) {
  const logOut = () => {
    signOut();
  };
  const logInAdmin = () => {
    signIn("google");
  };

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <Image
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
          </div>
        </>
      ) : (
        <>
          <div className={styles.sign} onClick={logInAdmin}>
            Log In
          </div>
          <div className={styles.signUp}>
            <Link href={"/api/auth/sign-up"}>Registrarse</Link>
          </div>
        </>
      )}
    </div>
  );
}
