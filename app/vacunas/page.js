"use client";
import styles from "./styles.module.css";
import InputField from "@/components/InputField";
import { Context } from "@/context/Context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Vacunas() {
  const router = useRouter();
  const { profile } = useContext(Context);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [vacuna, setVacuna] = useState({
    userId: "",
    nombre: "",
    lote: "",
    vacunatorio: "",
    foto: "",
    fechaAplicacion: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({
    userId: "",
    nombre: "",
    lote: "",
    vacunatorio: "",
    foto: "",
    fechaAplicacion: "",
  });
  useEffect(() => {
    if (profile) {
      setVacuna({ ...vacuna, userId: profile.id });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "foto") {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setVacuna({ ...vacuna, foto: reader.result });
            setPreview(reader.result);
          };
        } catch (error) {
          console.log("Error File Reader: ", error);
        }
      } else {
        setPreview(false);
      }
    } else {
      setVacuna({ ...vacuna, [name]: value });
      // console.log(
      //   `${Object.keys(vacuna).find((key) => key === name)}: `,
      //   vacuna[name]
      // );
    }
  };
  const validations = (form) => {
    const errors = {};
    if (!form.nombre) {
      errors.nombre = "Requerido";
    } else {
      errors.nombre = "";
    }
    if (!form.foto) {
      errors.foto = "Requerido";
    } else {
      errors.foto = "";
    }
    if (!form.fechaAplicacion) {
      errors.fechaAplicacion = "Requerido";
    } else if (form.fechaAplicacion >= new Date().toISOString().split("T")[0]) {
      errors.fechaAplicacion = "La fecha debe ser anterior al día de hoy";
    } else {
      errors.fechaAplicacion = "";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    setBusy(true);
    e.preventDefault();
    const error = validations(vacuna);
    setErrors(error);
    if (!(error.nombre || error.foto || error.fechaAplicacion)) {
      console.log("vacuna:", vacuna);
      try {
        const res = await fetch(`/api/vacunas`, {
          method: "POST",
          body: JSON.stringify(vacuna),
        }).then((res) => res.json());
        console.log("res", res);
        if (res?.vacuna) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setBusy(false);
  };
  return (
    <>
      <h1>Vacunas</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p>{vacuna.userId}</p>
        <InputField
          label="Nombre de Vacuna"
          name="nombre"
          type="text"
          value={vacuna.nombre}
          error={errors.nombre}
          handleChange={handleChange}
        />
        <InputField
          label="Lote de Vacuna"
          name="lote"
          type="text"
          value={vacuna.lote}
          error={errors.lote}
          handleChange={handleChange}
        />
        <InputField
          label="Nombre del Vacunatorio"
          name="vacunatorio"
          type="text"
          value={vacuna.vacunatorio}
          error={errors.vacunatorio}
          handleChange={handleChange}
        />
        <InputField
          label="Fecha de Aplicacion"
          name="fechaAplicacion"
          type="date"
          value={vacuna.fechaAplicacion}
          error={errors?.fechaAplicacion}
          handleChange={handleChange}
        />
        <InputField
          label="Foto del certificado"
          name="foto"
          type="file"
          // value={vacuna.foto}
          error={errors?.foto}
          handleChange={handleChange}
        />
        {preview ? (
          <img className={styles.preview} src={preview} alt={vacuna.foto} />
        ) : (
          <img
            className={styles.preview}
            src="https://res.cloudinary.com/dzpni2m96/image/upload/v1694720817/imge-placeholder2_sqmvby.jpg"
            alt={vacuna.foto}
          />
        )}
        <button
          className={styles.registerButton}
          type="submit"
          disabled={busy}
          style={{ opacity: busy ? 0.5 : 1 }}
        >
          Registrar Vacuna
        </button>
      </form>
    </>
  );
}
