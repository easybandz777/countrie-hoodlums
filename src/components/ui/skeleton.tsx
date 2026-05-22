import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-[#2A2A2A] via-[#3A3A3A] to-[#2A2A2A] bg-[length:200%_100%]",
        className
      )}
    />
  );
}
