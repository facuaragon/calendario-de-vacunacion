import Link from "next/link";
import styles from "./navbar.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserLogged from "../UserLogged";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <header className={styles.navbar}>
        <Link href="/">Home</Link>
        <UserLogged user={session ? session.user : null} />
      </header>
    </>
  );
}
