"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

const FilterAndSort = ({ 
  sortField = "name", 
  filterOptions = [] 
}: { 
  sortField?: string;
  filterOptions?: { label: string; field: string; value: string }[];
}) => {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);

  const handleSort = () => {
    const params = new URLSearchParams(window.location.search);
    const currentSort = params.get("sort");
    const [field, order] = (currentSort || "").split(":");
    
    let newOrder = "asc";
    if (field === sortField && order === "asc") {
      newOrder = "desc";
    }
    
    params.set("sort", `${sortField}:${newOrder}`);
    router.push(`${window.location.pathname}?${params}`);
  };

  const handleFilter = (field: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      params.delete(field);
    } else {
      params.set(field, value);
    }
    router.push(`${window.location.pathname}?${params}`);
    setShowFilter(false);
  };

  return (
    <div className="flex items-center gap-4">
      {/* FILTER */}
      <div className="relative">
        <button 
          onClick={() => setShowFilter(!showFilter)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
        >
          <SlidersHorizontal size={14} style={{ color: "var(--theme-text)" }} />
        </button>
        {showFilter && filterOptions.length > 0 && (
          <div
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 p-2"
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
            }}
          >
            <h3 className="text-xs font-semibold mb-2 px-2" style={{ color: "var(--theme-text)" }}>Filter By</h3>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => handleFilter("", "")}
                className="text-left text-xs p-2 rounded transition-colors"
                style={{ color: "var(--theme-text)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--theme-primary-lighter)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Clear Filters
              </button>
              {filterOptions.map((opt) => (
                <button 
                  key={`${opt.field}-${opt.value}`}
                  onClick={() => handleFilter(opt.field, opt.value)}
                  className="text-left text-xs p-2 rounded transition-colors"
                  style={{ color: "var(--theme-text)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--theme-primary-lighter)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SORT */}
      <button 
        onClick={handleSort}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
      >
        <ArrowUpDown size={14} style={{ color: "var(--theme-text)" }} />
      </button>
    </div>
  );
};

export default FilterAndSort;
