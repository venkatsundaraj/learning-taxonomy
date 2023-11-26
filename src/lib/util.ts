import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "./env.mjs";

export const cn = function (...className: ClassValue[]) {
  return twMerge(clsx(className));
};

export const formatDate = function (input: string | number): string {
  return new Date(input).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
export const absoluteUrl = function (path: string) {
  return `${env}${path}`;
};
