"use client";

import { Header } from "@/shared/components/shared";

export default function ClientLayoutShell({ children, modal }) {
  return (
    <>
      <Header />
      {children}
      {modal}
    </>
  );
}
