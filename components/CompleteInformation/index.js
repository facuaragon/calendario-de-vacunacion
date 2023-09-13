"use client";
import { useContext, useState } from "react";
import InputField from "../InputField";
import { Context } from "@/context/Context";

export default function CompleteInformation() {
  const { setModal } = useContext(Context);
  const { profile, fetchProfile } = useContext(Context);
  console.log("complete info: ", profile);
  const [user, setUser] = useState({
    email: profile.email,
    name: profile.name,
    id: profile.id,
    role: profile.role,
    birthday: profile.birthday
      ? profile.birthday
      : new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({
    birthday: "",
  });
  const [busy, setBusy] = useState(false);
  const [age, setAge] = useState();
  const validations = (form) => {
    const errors = {};
    // console.log(form.birthday, new Date().toISOString().split("T")[0]);
    if (form.birthday >= new Date().toISOString().split("T")[0]) {
      errors.birthday = "La fecha debe ser anterior al día de hoy";
    } else {
      errors.birthday = "";
    }
    return errors;
  };
  const getAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let difference = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();

    if (
      months < 0 ||
      (months === 0 && today.getDate() <= birthDate.getDate())
    ) {
      difference--;
    }
    setAge(difference);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === "birthday") {
      getAge(value);
    }
    console.log(user.birthday);
  };
  const handleSubmit = async (e) => {
    setBusy(true);
    e.preventDefault();
    const error = validations(user);
    setErrors(error);
    if (!error.birthday) {
      try {
        const res = await fetch(`/api/auth/users/${user.id}`, {
          method: "PUT",
          body: JSON.stringify(user),
        }).then((res) => res.json());
        console.log(res);
        if (res.message === "User Updated") {
          await fetchProfile(user.email);
          setModal(false);
        } else {
          throw new Error("No se pudo actualizar el Perfil");
        }
      } catch (error) {
        console.log("Complete Information: ", error);
      }
    }
    setBusy(false);
  };
  return (
    <>
      <p>Para una mejor experiencia</p>
      <p>Por favor completa la siguiente información</p>
      <div>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Fecha de Nacimiento"
            name="birthday"
            type="date"
            value={user.birthday}
            error={errors?.birthday}
            handleChange={handleChange}
          />
          {age && <h5>{age} años</h5>}
          <button
            type="submit"
            disabled={busy}
            style={{ opacity: busy ? 0.5 : 1 }}
          >
            Registrar
          </button>
        </form>
      </div>
    </>
  );
}
