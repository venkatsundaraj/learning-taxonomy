import { cn } from "@/lib/util";
import { FC } from "react";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input: FC<InputProps> = ({ className, type, ...props }, ref) => {
//   return (
//     <input
//       {...props}
//       ref={ref}
//       type={type}
//       className={cn(
//         "flex w-full h-10 border-input text-sm border bg-transparent ring-offset-background px-2 py-3 file:text-sm file:border-none file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70",
//         className
//       )}
//     />
//   );
// };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        className={cn(
          "flex w-full h-10 border-input text-sm border bg-transparent ring-offset-background px-2 py-3 file:text-sm file:border-none file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
