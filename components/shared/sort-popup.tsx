import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-flex item-center gap-1 bg-gray-50 px5 h-[52px] raunded-2x1 cursor-pointer",
        className
      )}>
      <ArrowUpDown className="w-4 h-4" />
      <b>Сортировка</b>
      <b className="text-primary">популярное</b>
    </div>
  );
};
