import startDb from "@/libs/mongodb";
import NextAuth, { NextAuthOptions } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/models/userModel";

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await startDb();
        const user = await UserModel.findOne({ email });
        if (!user)
          throw Error("El correo electrónico o contraseña no coinciden");
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch)
          throw Error("El correo electrónico o contraseña no coinciden");
        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt(params) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      //return final token
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({ user, account, req, res }) {
      console.log("user", user);
      console.log("account", account);

      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await startDb();
          const oldUser = await UserModel.findOne({ email });
          if (!oldUser) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/auth/users`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  signIn: "google",
                }),
              }
            );
            if (!res.ok) {
              throw new Error("Error al crear el usuario");
            }
            const newUser = await res.json();
            return newUser;
          }
          return oldUser;
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
