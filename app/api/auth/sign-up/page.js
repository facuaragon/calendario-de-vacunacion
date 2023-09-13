"use client";
import styles from "./styles.module.css";
import InputField from "@/components/InputField";
import GoogleIcon from "@/components/icons/Google";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const { useState } = require("react");

export default function SignUp() {
  const session = useSession();
  const router = useRouter();
  const { data, status } = session;
  const isAuth = status === "authenticated";
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    passChecked: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passChecked: "",
  });
  const { name, email, password } = userInfo;
  const validations = (form) => {
    const errors = {};
    if (!form.name) {
      errors.name = "Requerido";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(form.name)) {
      errors.name = "Solo letras y espacios";
    } else {
      errors.name = "";
    }
    if (!form.email) {
      errors.email = "Requerido";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        form.email
      )
    ) {
      errors.email = "Formato de correo electrónico inválido";
    } else {
      errors.email = "";
    }
    if (!form.password) {
      errors.password = "Requerido";
    } else if (!/^.{8,}$/.test(form.password)) {
      errors.password = "Debe tener al menos 8 caracteres";
    }
    if (!form.passChecked) {
      errors.passChecked = "Requerido";
    } else if (form.passChecked !== form.password) {
      errors.passChecked = "Las contraseñas no coinciden";
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    setBusy(true);
    e.preventDefault();
    const error = validations(userInfo);
    setErrors(error);
    if (!(error.name || error.email || error.password || error.passChecked)) {
      try {
        const res = await fetch("/api/auth/users", {
          method: "POST",
          body: JSON.stringify(userInfo),
        }).then((res) => res.json());
        // console.log(res);
        if (res?.user) {
          router.push("/api/auth/sign-up/success");
        }
        if (res?.error) {
          setErrors({ ...errors, email: res.error });
        }
      } catch (error) {
        console.log(error);
      }
    }
    setBusy(false);
  };
  const logInWithGoogle = async () => {
    try {
      const res = await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          label="Nombre Completo"
          name="name"
          type="text"
          value={userInfo.name}
          error={errors.name}
          handleChange={handleChange}
        />
        <InputField
          label="Correo Electrónico"
          name="email"
          type="text"
          value={userInfo.email}
          error={errors.email}
          handleChange={handleChange}
        />
        <InputField
          label="Contraseña"
          name="password"
          type="password"
          value={userInfo.password}
          error={errors.password}
          handleChange={handleChange}
        />
        <InputField
          label="Repetir contraseña"
          name="passChecked"
          type="password"
          value={userInfo.passChecked}
          error={errors.passChecked}
          handleChange={handleChange}
        />
        <button
          className={styles.registerButton}
          type="submit"
          disabled={busy}
          style={{ opacity: busy ? 0.5 : 1 }}
        >
          Registrarse
        </button>
        <button
          type="button"
          className={styles.googleButton}
          onClick={logInWithGoogle}
        >
          <GoogleIcon /> Registrarse con Google
        </button>
        <p className={styles.redirect}>
          Tienes una cuenta? <Link href="/api/auth/sign-in">Login</Link>
        </p>
      </form>
    </>
  );
}
