"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";

interface Props {
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50); // Если прокрутка > 50px, делаем TopBar полупрозрачным
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 py-5 shadow-lg shadow-black/5 z-10 transition-all duration-300",
        isSticky ? "bg-white/50 backdrop-blur-md" : "bg-white",
        className
      )}>
      <Container className="flex items-center justify-between">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};

// import React from "react";
// import { cn } from "@/lib/utils";
// import { Container } from "./container";
// import { Categories } from "./categories";
// import { SortPopup } from "./sort-popup";

// interface Props {
//   className?: string;
// }

// export const TopBar: React.FC<Props> = ({ className }) => {
//   return (
//     <div
//       className={cn(
//         "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
//         className
//       )}>
//       <Container className="flex items-center justify-between">
//         <Categories />
//         <SortPopup />
//       </Container>
//     </div>
//   );
// };
