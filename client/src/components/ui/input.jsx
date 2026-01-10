import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "flex h-10 w-full rounded-[0.50rem] border border-[#d90429ff] bg-white px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d90429ff]",
          "transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
