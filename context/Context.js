"use client";
import { useSession } from "next-auth/react";
import { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [modal, setModal] = useState(false);
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
