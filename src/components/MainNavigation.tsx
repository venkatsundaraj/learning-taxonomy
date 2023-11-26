"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FC } from "react";
import { Icon, Icons } from "./Icons";

import { MainNavItem } from "@/types";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/util";
import { title } from "process";

interface MainNavigationProps {
  items: MainNavItem[];
}

const MainNavigation: FC<MainNavigationProps> = ({ items }) => {
  const [navItems, setNavItems] = useState<MainNavItem[]>(items);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex gap-6 container">
      <Link
        className="hidden md:flex items-center justify-center gap-2"
        href="/"
      >
        <Icons.Snail className="" />
        <span className="font-bold text-black">Protrack</span>
      </Link>
      {items.length > 0 ? (
        <nav className="flex flex-row gap-6 items-center">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "hidden md:flex font-paragraph",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button className="flex md:hidden">Menu</button>
      {showMobileMenu && items.length > 0}
    </div>
  );
};

export default MainNavigation;
