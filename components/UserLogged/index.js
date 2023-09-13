"use client";
import { signOut } from "next-auth/react";
import styles from "./userLogged.module.css";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { Context } from "@/context/Context";
import Modal from "../Modal";

export default function UserLogged({ user }) {
  const { modal, setModal } = useContext(Context);
  const { profile, fetchProfile, eraseProfile } = useContext(Context);

  useEffect(() => {
    if (profile && (!profile.email || !profile.name || !profile.birthday)) {
      // modal opens to complete data
      setModal(true);
    } else {
      setModal(false);
    }
  }, [profile]);

  if (user) {
    const searchProfile = async () => {
      await fetchProfile(user.email);
    };
    searchProfile();
  } else {
    eraseProfile();
  }

  const logOut = () => {
    signOut();
  };

  return (
    <div className={styles.container}>
      {modal && <Modal type="completeProfile" />}
      {user ? (
        <>
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
