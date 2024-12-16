"use client";
import UserButton from "@/components/user-Button";
import { SessionProvider } from "next-auth/react";

const Home = () => {
  return (
    <div>
      <SessionProvider>
        <UserButton />
      </SessionProvider>
    </div>
  );
};
export default Home;
