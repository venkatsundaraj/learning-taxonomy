import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/util";
import Link from "next/link";
import { FC } from "react";
import UserauthForm from "@/components/UserauthForm";

export const metaData = {
  title: "Register",
  description: "Register here if your are a new user",
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="w-full min-h-screen container grid lg:grid-cols-2 items-center  relative">
      <Link
        href={"/login"}
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "absolute top-10 right-4"
        )}
      >
        Login
      </Link>
      <div className="hidden lg:block bg-muted h-full" />
      <div className="lg:p-8 ">
        <div className="flex flex-col gap-2 items-center justify-between text-center">
          <Icons.Snail width={30} height={30} />
          <h1 className="text-primary font-bold font-heading text-xl mb-3 lg:text-4xl">
            Creat Your Account here.
          </h1>
          <p className="font-paragraph leading-6 whitespace-normal text-muted-foreground">
            Enter your login details to create your account
          </p>
          <UserauthForm />
          <p className="mt-3">
            By clicking continue, you agree to our <br />
            <Link
              href="/terms-and-condition"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
