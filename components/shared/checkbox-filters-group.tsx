"use client";

import React from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filters-checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selectedIds?: Set<string>;
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  loading,
  onClickCheckbox,
  selectedIds,
  defaultValue,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="w-28 h-6 mb-4 rounded-[8px]" />
          ))}
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      <div className="mb-5">
        <Input
          onChange={onChangeSearchInput}
          placeholder={searchInputPlaceholder}
          className="bg=gray-50 border-none"
        />
      </div>

      <div className="flex flex-col gap-4 max-h-96 mt-5 pr-2 overflow-auto scrollbar">
        {list.map((item) => (
          <FilterCheckbox
            key={item.value}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedIds?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
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
