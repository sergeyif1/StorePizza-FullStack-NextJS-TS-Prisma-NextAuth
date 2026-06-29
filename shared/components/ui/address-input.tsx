"use client";

import React from "react";
import { useDebounce } from "react-use";
import { cn } from "@/shared/lib/utils";

interface AddressItem {
  display_name: string;
  country?: string;
}

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSelect"> {
  onSelect?: (value: string) => void;
}

export const AddressInput = ({
  className,
  value,
  onChange,
  onSelect,
  ...props
}: Props) => {
  const [query, setQuery] = React.useState(String(value ?? ""));
  const [items, setItems] = React.useState<AddressItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  // sync внешнего value
  React.useEffect(() => {
    setQuery(String(value ?? ""));
  }, [value]);

  // debounce поиск
  useDebounce(
    () => {
      if (query.length < 3) {
        setItems([]);
        setOpen(false);
        return;
      }

      fetchAddresses(query);
    },
    300,
    [query],
  );

  const fetchAddresses = async (text: string) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(
          text,
        )}`,
      );

      const data = await res.json();

      const mapped: AddressItem[] = data.map((item: any) => ({
        display_name: item.display_name,
        country: item.address?.country,
      }));

      setItems(mapped);
      setOpen(mapped.length > 0);
    } finally {
      setLoading(false);
    }
  };

  const selectItem = (item: AddressItem) => {
    setQuery(item.display_name);
    setItems([]);
    setOpen(false);

    onChange?.({
      target: { value: item.display_name },
    } as any);

    onSelect?.(item.display_name);
  };

  // закрытие при клике вне
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        {...props}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange?.(e);
        }}
        onFocus={() => {
          if (items.length > 0) setOpen(true);
        }}
        className={cn(
          "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base",
          className,
        )}
      />

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-white shadow-md">
          {loading && <div className="p-3 text-sm text-gray-500">Поиск...</div>}

          {!loading && items.length === 0 && (
            <div className="p-3 text-sm text-gray-500">Ничего не найдено</div>
          )}

          {items.map((item, idx) => (
            <div
              key={idx}
              onMouseDown={(e) => {
                e.preventDefault(); // 🔥 важно: НЕ теряем фокус
                selectItem(item);
              }}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100">
              <div className="font-medium">{item.display_name}</div>
              <div className="text-xs text-gray-500">{item.country}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
