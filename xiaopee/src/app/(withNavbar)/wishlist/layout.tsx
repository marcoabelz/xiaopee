import Navbar from "../../../components/Navbar";
import ServerProtectedComponent from "../../../components/ServerProtectedComponent";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>
        <ServerProtectedComponent>{children}</ServerProtectedComponent>
      </section>
    </>
  );
}
