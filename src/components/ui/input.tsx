import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-[#333] bg-[#1A1A1A] px-4 py-2.5 text-white placeholder-[#8A8A8A] transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    />
  );
}
