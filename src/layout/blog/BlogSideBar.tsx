"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetCategoryWithCounts } from "@/service";
import { debounce } from "@/lib/utils";
import { Search } from "lucide-react";

type Props = {
  onSearchChange: (value: string) => void;
  onCategoryClick: (categoryId?: string, name?: string) => void;
  activeCategoryId?: string;
  showOnMobile?: boolean;
  hideSearch?: boolean;
  onFocusSearch?: () => void;
};

const BlogSideBar = ({
  onSearchChange,
  onCategoryClick,
  activeCategoryId,
  showOnMobile = false,
  hideSearch = false,
  onFocusSearch,
}: Props) => {
  const { data, isLoading } = useGetCategoryWithCounts();
  const [localSearch, setLocalSearch] = useState("");
  const [count, setCount] = useState(0);

  const debouncedEmit = useMemo(
    () => debounce((val: string) => onSearchChange(val), 400),
    [onSearchChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setLocalSearch(val);
      debouncedEmit(val);
    },
    [debouncedEmit]
  );

  useEffect(() => {
    if (data) {
      const count = data.data.reduce(
        (sum: number, item: any) => sum + item.blogCount,
        0
      );
      setCount(count);
    }
  }, [data]);

  const asideClass = showOnMobile
    ? "block w-full pr-0"
    : "hidden lg:block w-72 shrink-0 pr-6";
  const innerClass = showOnMobile ? "space-y-6" : "sticky top-24 space-y-6";

  return (
    <aside className={asideClass}>
      <div className={innerClass}>
        {/* Search */}
        {!hideSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              value={localSearch}
              onFocus={onFocusSearch}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              autoComplete="off"
              placeholder="Izlash..."
              className="w-full rounded shadow pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        )}

        {/* Categories */}
        <div>
          <div className="space-y-2">
            <button
              type="button"
              className={`w-full cursor-pointer flex items-center justify-between rounded-md py-2 text-left text-sm`}
              onClick={() => onCategoryClick(undefined)}
            >
              <span className="truncate text-[#737373] font-bold text-[16px]">
                Barchasi
              </span>
              <span className="truncate text-[#C2C2C2E5] font-bold text-[10px]">
                {count} ta
              </span>
            </button>
            {isLoading && (
              <div className="text-sm text-gray-500">Yuklanmoqda...</div>
            )}
            {data?.data?.map((item: any) => (
              <button
                type="button"
                key={item._id}
                className={`w-full relative text-center overflow-hidden border md:border-none  border-gray-300 shadow rounded mt-2 lg:mt-auto lg:shadow-none cursor-pointer lg:flex items-center text-[16px] font-bold justify-between text-[#737373] py-2 px-8 lg:px-0 md:text-left`}
                onClick={() => onCategoryClick(item._id, item.name)}
                title={item.name}
              >
                <span className="lg:truncate break-words max-w-[150px]">
                  {item.name}
                </span>
                <span className=" absolute lg:static right-2 bottom-1 text-[#C2C2C2E5] text-[10px]">
                  {item.blogCount} ta
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BlogSideBar;
