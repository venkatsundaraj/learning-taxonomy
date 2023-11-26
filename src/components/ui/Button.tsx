import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";
import { cn } from "@/lib/util";

export const buttonVariants = cva(
  "rounded-md shadow-sm transition-colors font-medium text-sm inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-3 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "py-2 px-4 h-10",
        sm: "h-9 px-3 rounded-sm",
        lg: "h-11 px-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
