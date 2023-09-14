"use client";

import { Context } from "@/context/Context";
import { useContext, useEffect, useState } from "react";

export default function Perfil() {
  const { profile, vacunas } = useContext(Context);
  const [age, setAge] = useState();
  const [category, setCategory] = useState();
  const etapas = [
    {
      embarazo: true,
      recienNacido: false,
      edadMin: 0,
      edadMax: 0,
      nombre: "Persona Gestante",
    },
    {
      embarazo: false,
      recienNacido: true,
      edadMin: 0,
      edadMax: 0,
      nombre: "Persona recién Nacida",
    },
    {
      embarazo: false,
      recienNacido: false,
      edadMin: 0,
      edadMax: 1,
      nombre: "Hasta el año de vida",
    },
    {
      embarazo: false,
      recienNacido: false,
      edadMin: 1,
      edadMax: 2,
      nombre: "Hasta los dos años de vida",
    },
    {
      embarazo: false,
      recienNacido: false,
      edadMin: 2,
      edadMax: 5,
      nombre: "5 años",
    },
    {
      embarazo: false,
      recienNacido: false,
      edadMin: 5,
      edadMax: 11,
      nombre: "11 años",
    },
    {
      embarazo: false,
      recienNacido: false,
      edadMin: 11,
      edadMax: 65,
      nombre: "Personas jóvenes y adultas",
    },
    {
      embarazo: false,
      recienNacido: false,
      edadMin: 65,
      edadMax: Infinity,
      nombre: "A partir de los 65 años",
    },
  ];
  // console.log(profile);
  const getAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    // console.log(today.getFullYear() - birthDate.getFullYear());
    let difference = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();

    if (
      months < 0 ||
      (months === 0 && today.getDate() <= birthDate.getDate())
    ) {
      difference--;
    }
    // console.log(difference);
    setAge(difference);
  };

  useEffect(() => {
    // console.log(vacunas);
    if (profile) {
      // console.log(profile);
      getAge(profile?.birthday.split("T")[0]);
      if (age) {
        const cat = etapas.map((etapa) => {
          if (etapa.edadMin <= age && etapa.edadMax >= age) {
            setCategory(etapa.nombre);
          }
        });
      }
      // const fetchvacunas = async () => {
      //   const getVacunas = async () => {
      //     try {
      //       const res = await fetch(`/api/vacunas/${profile.id}`);
      //       if (res.ok) {
      //         return res.json();
      //       } else {
      //         throw new error("error al obtener vacunas");
      //       }
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   };
      //   const vacunasResponse = await getVacunas();
      //   console.log(vacunasResponse);
      // };
      // let vacunas = fetchvacunas();
    }
  }, [profile, age, vacunas]);
  return (
    <>
      <h1>Hola {profile?.name}</h1>
      <p>
        Segun las indicaciones del Ministerio de Salud y la informacion brindada
        al sitio tienes <strong>{age}</strong> años
      </p>
      <p>
        Por lo que te encuentras en la siguiente categoría:{" "}
        <strong>{category}</strong>
      </p>
      {vacunas && (
        <>
          <h2>tus vacunas</h2>
          {vacunas.map((vacuna, i) => (
            <p key={i}>{vacuna.nombre}</p>
          ))}
        </>
      )}
    </>
  );
}
