import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React, { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  // const session = await getServerSession();
  // if (!session) notFound();
  return <main>{children}</main>;
};

export default layout;
