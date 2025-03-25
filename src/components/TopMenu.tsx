"use client";

import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";
import styles from "./topmenu.module.css"; // Import the styles

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

      <div className={`${styles.rightSection} flex flex-row absolute right-0 h-full`}>
        <TopMenuItem title="Cart" pageRef="/cart" />
        {session ? (
          <Link href="/api/auth/signout">
            <div className={styles.itemcontainer}>
              Sign-Out {/*session.user?.name*/}
            </div>
          </Link>
        ) : (
          <>
            <Link href="/register">
              <div className={styles.itemcontainer}> {/* Apply itemcontainer style */}
                Register
              </div>
            </Link>
            <Link href="/api/auth/signin">
              <div className={styles.itemcontainer}> {/* Apply itemcontainer style */}
                Sign-In
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
