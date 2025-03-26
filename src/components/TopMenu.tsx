import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";
import styles from "./topmenu.module.css";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.menucontainer}>
      <Image
        src={"/img/logo.png"}
        className={styles.logoimg}
        alt="logo"
        width={0}
        height={0}
        sizes="100vh"
      />
      <TopMenuItem title="Select Car" pageRef="/car" />
      <TopMenuItem title="Home" pageRef="/" />

      <div className={`flex flex-row absolute right-0 h-full`}>
        <TopMenuItem title="Cart" pageRef="/cart" />
        {session ? (
          <TopMenuItem title="Sign-Out" pageRef="/api/auth/signout" />
        ) : (
          <>
          <TopMenuItem title="Register" pageRef="/register" />
          <TopMenuItem title="Sign-in" pageRef="/api/auth/signin" />

          </>
        )}
      </div>
    </div>
  );
}