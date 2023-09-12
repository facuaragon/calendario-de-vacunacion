"use client";
import styles from "./styles.module.css";
import InputField from "@/components/InputField";
import Link from "next/link";

const { useState } = require("react");

export default function SignUp() {
  const [busy, setBusy] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
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
    } else if (!/^.{8}$/.test(form.password)) {
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
    if (!(error.name || error.email || error.phone || error.message)) {
      const res = await fetch("/api/auth/users", {
        method: "POST",
        body: JSON.stringify(userInfo),
      }).then((res) => res.json());
      console.log(res);
    }
    setBusy(false);
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
        <button
          type="submit"
          disabled={busy}
          style={{ opacity: busy ? 0.5 : 1 }}
        >
          Registrarse
        </button>
        <p className={styles.redirect}>
          Tienes una cuenta? <Link href="/">Login</Link>
        </p>
      </form>
    </>
  );
}
