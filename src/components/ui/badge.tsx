import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "sale" | "soldOut";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#C9A227] text-black",
  sale: "bg-red-600 text-cream",
  soldOut: "bg-gray-600 text-gray-200",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
