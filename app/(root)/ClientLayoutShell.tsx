"use client";

import { Header } from "@/shared/components/shared";

interface Props {
  children: React.ReactNode;
  modal?: React.ReactNode;
}

export default function ClientLayoutShell({ children, modal }: Props) {
  return (
    <>
      <Header />
      {children}
      {modal}
    </>
  );
}
