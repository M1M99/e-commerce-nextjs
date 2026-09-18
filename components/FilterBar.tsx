"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useRef, useEffect } from "react";
import { ChevronDown, Check, ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { name: "Standart Sıralama", value: "" },
  { name: "Ucuzdan Bahaya", value: "price-asc" },
  { name: "Bahadan Ucuza", value: "price-desc" },
  { name: "Ən Yenilər", value: "newest" },
];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const currentSort = searchParams.get("sort") || "";

  // Kənara klikləyəndə dropdown-u bağlamaq üçün
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const activeSortName = SORT_OPTIONS.find(opt => opt.value === currentSort)?.name || "Standart Sıralama";

  return (
    <div className="flex justify-end w-full md:w-auto">
      
      {/* CUSTOM SIRALAMA DROPDOWN (Animasiyalı) */}
      <div className="relative min-w-[220px] w-full md:w-auto" ref={sortRef}>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className={`
            w-full flex items-center justify-between gap-2 h-10 px-4 py-2 text-sm font-medium 
            bg-white dark:bg-neutral-900 border rounded-xl transition-all duration-200
            ${isSortOpen ? "border-neutral-900 dark:border-white shadow-md" : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"}
          `}
        >
          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
            <ArrowUpDown className="w-4 h-4 text-neutral-500" />
            <span>{activeSortName}</span>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} 
          />
        </button>

        {/* Dropdown Menyusu (Scale & Opacity Animasiyası) */}
        <div
          className={`
            absolute right-0 top-full mt-2 w-full min-w-[220px] p-1 
            bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 
            rounded-xl shadow-xl z-50 transform origin-top-right transition-all duration-200 ease-out
            ${isSortOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
          `}
        >
          {SORT_OPTIONS.map((option) => {
            const isSelected = currentSort === option.value;
            return (
              <button
                key={option.value}
                onClick={() => {
                  handleFilter("sort", option.value);
                  setIsSortOpen(false); // Seçdikdən sonra bağla
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors
                  ${isSelected 
                    ? "bg-neutral-100 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white" 
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white"
                  }
                `}
              >
                {option.name}
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}