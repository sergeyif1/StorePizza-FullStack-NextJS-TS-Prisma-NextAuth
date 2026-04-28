"use client";

import React from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  const query = React.useMemo(() => {
    if (!filters) return "";

    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    return qs.stringify(params, {
      arrayFormat: "brackets",
    });
  }, [
    filters?.prices,
    filters?.pizzaTypes,
    filters?.sizes,
    filters?.selectedIngredients,
  ]);

  React.useEffect(() => {
    if (!query) return;

    router.replace(`?${query}`, { scroll: false });
  }, [query, router]);
};

// export const useQueryFilters = (filters: Filters) => {
//   const router = useRouter();

//   React.useEffect(() => {
//     const params = {
//       ...filters.prices,
//       pizzaTypes: Array.from(filters.pizzaTypes),
//       sizes: Array.from(filters.sizes),
//       ingredients: Array.from(filters.selectedIngredients),
//     };

//     const query = qs.stringify(params, {
//       arrayFormat: "brackets",
//     });

//     router.replace(`?${query}`, {
//       scroll: false,
//     });
//   }, [filters, router]);
// };
