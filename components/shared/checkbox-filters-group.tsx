"use client";

import React from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filters-checkbox";
import { Input } from "../ui/input";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 3,
  searchInputPlaceholder = "Поиск...",
  className,
  // onChange,
  // defaultValue,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit);
  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      <div className="mb=5">
        <Input
          onChange={onChangeSearchInput}
          placeholder={searchInputPlaceholder}
          className="bg=gray-50 border-none"
        />
      </div>

      <div className="flex flex-col placeholder:gap-4 max-h-96 mt-5 pr-2 overflow-avto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            onCheckedChange={(ids) => console.log(ids)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="font-bold text-primary mt-3">
            {showAll ? "Скрыть" : "+Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
