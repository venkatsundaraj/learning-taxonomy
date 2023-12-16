"use client";

import { FC } from "react";
import { Label } from "./ui/Label";
import Input from "./ui/Input";
import { useForm } from "react-hook-form";
import { userAuthSchema } from "@/lib/validation/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./ui/Button";
import { Icons } from "./Icons";
import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export type formData = z.infer<typeof userAuthSchema>;

interface UserauthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserauthForm: FC<UserauthFormProps> = ({ ...props }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(userAuthSchema),
  });

  const onSubmit = async function (data: formData) {
    try {
      setLoading(true);
      const result = await signIn("email", {
        callbackUrl: searchParams.get("from") || "/dashboard",
        redirect: false,
        email: data.email.toLowerCase(),
      });
      // const result = await axios.post(`/api/hello`, data);
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      {...props}
      className="flex gap-2 w-full max-w-sm items-center justify-between"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center gap-5"
      >
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <Input
          {...register("email")}
          autoCapitalize="none"
          autoComplete="off"
          disabled={loading}
          type="email"
          placeholder="name@example.com"
        />
        {errors.email ? <p>{errors.email.message}</p> : null}
        <Button type="submit" aria-label="button" isLoading={loading}>
          {loading ? <Icons.Loader2 className="animate-spin" /> : null}
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserauthForm;
