"use client";
import { useSession } from "next-auth/react";
import { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [modal, setModal] = useState(false);
  const [vacunas, setVacunas] = useState();
  const fetchProfile = async (email) => {
    const getProfile = async (email) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/auth/users/email/${email}`
        );
        // console.log(res);
        if (!res.ok) {
          throw new Error("No se encontró el usuario");
        }
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };
    if (!profile || profile.email != email) {
      let profileResponse = await getProfile(email);
      if (profileResponse && profileResponse.user) {
        setProfile(profileResponse.user);
        const getVacunas = async () => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/vacunas/${profileResponse.user.id}`
            );
            if (res.ok) {
              return res.json();
            } else {
              throw new error("error al obtener vacunas");
            }
          } catch (error) {
            console.log(error);
          }
        };
        const vacunasResponse = await getVacunas();
        // console.log(vacunasResponse.vacunas);
        if (vacunasResponse.vacunas) {
          // console.log("estoy aca");
          setVacunas(vacunasResponse.vacunas);
        }
      } else {
        throw new Error("No se encontró el usuario");
      }
    }
  };
  const eraseProfile = () => {
    setProfile();
  };

  return (
    <Context.Provider
      value={{
        profile,
        fetchProfile,
        eraseProfile,
        modal,
        setModal,
        vacunas,
        setVacunas,
      }}
    >
      {children}
    </Context.Provider>
  );
};
