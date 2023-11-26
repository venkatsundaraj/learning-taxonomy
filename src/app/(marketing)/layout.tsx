import Link from "next/link";
import React, { Children, FC } from "react";
import { marketingConfig } from "@/config/marketing";
import MainNavigation from "@/components/MainNavigation";
import { cn } from "@/lib/util";
import { buttonVariants } from "@/components/ui/Button";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <header className="z-50 w-screen overflow-x-hidden py-5 bg-background ">
        <div className="container flex items-center justify-between">
          <MainNavigation items={marketingConfig} />
          <Link
            className={cn(
              buttonVariants({ variant: "secondary", size: "default" })
            )}
            href="/login"
          >
            Login
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <h1></h1>
      </footer>
    </>
  );
};

export default layout;
