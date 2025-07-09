"use client";

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filters-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "../shared/range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold m-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input type="number" min={100} max={1000} placeholder="1000" />
        </div>

        <RangeSlider min={0} max={500} step={10} value={[0, 500]} />
      </div>
      <div>
        <CheckboxFiltersGroup
          title="Ингридиенты"
          className="mt-5"
          limit={4}
          defaultItems={[
            {
              text: "Сырный соус",
              value: "1",
            },
            {
              text: "Моцарелла",
              value: "2",
            },

            {
              text: "Чеснок",
              value: "3",
            },
            {
              text: "Соленые огурчики",
              value: "4",
            },
            {
              text: "Сырный соус",
              value: "5",
            },
            {
              text: "Моцарелла",
              value: "6",
            },
            {
              text: "Чеснок",
              value: "7",
            },
            {
              text: "Соленые огурчики",
              value: "8",
            },
          ]}
          items={[
            {
              text: "Сырный соус",
              value: "1",
            },
            {
              text: "Моцарелла",
              value: "2",
            },
            {
              text: "Чеснок",
              value: "3",
            },
            {
              text: "Соленые огурчики",
              value: "4",
            },
            {
              text: "Сырный соус",
              value: "5",
            },
            {
              text: "Моцарелла",
              value: "6",
            },
            {
              text: "Чеснок",
              value: "7",
            },
            {
              text: "Соленые огурчики",
              value: "8",
            },
            {
              text: "Сырный соус",
              value: "1",
            },
            {
              text: "Моцарелла",
              value: "2",
            },
            {
              text: "Чеснок",
              value: "3",
            },
            {
              text: "Соленые огурчики",
              value: "4",
            },
            {
              text: "Сырный соус",
              value: "5",
            },
            {
              text: "Моцарелла",
              value: "6",
            },
            {
              text: "Чеснок",
              value: "7",
            },
            {
              text: "Соленые огурчики",
              value: "8",
            },
          ]}
        />
      </div>
    </div>
  );
};
