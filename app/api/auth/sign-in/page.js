"use client";
import styles from "./styles.module.css";
import InputField from "@/components/InputField";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleIcon from "@/components/icons/Google";
import { usePathname } from "next/navigation";

const { useState } = require("react");

export default function SignIn() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const pathname = usePathname();
  const { name, email, password } = userInfo;
  const validations = (form) => {
    const errors = {};
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
    if (!(error.email || error.password)) {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) return setError(res.error);
      router.replace("/");
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
        {error && <div>{error}</div>}
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
        <button
          type="submit"
          className={styles.registerButton}
          disabled={busy}
          style={{ opacity: busy ? 0.5 : 1 }}
        >
          Log In
        </button>
        {pathname == "/api/auth/sign-in" && (
          <button
            type="button"
            className={styles.googleButton}
            onClick={logInWithGoogle}
          >
            <GoogleIcon /> Ingresar con Google
          </button>
        )}
        <p className={styles.redirect}>
          Aun no tienes una cuenta?{" "}
          <Link href="/api/auth/sign-up">Registrarse</Link>
        </p>
      </form>
    </>
  );
}
