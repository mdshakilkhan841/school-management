"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        {showFilter && filterOptions.length > 0 && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-2">
            <h3 className="text-xs font-semibold mb-2 px-2">Filter By</h3>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => handleFilter("", "")}
                className="text-left text-xs p-2 hover:bg-gray-100 rounded"
              >
                Clear Filters
              </button>
              {filterOptions.map((opt) => (
                <button 
                  key={`${opt.field}-${opt.value}`}
                  onClick={() => handleFilter(opt.field, opt.value)}
                  className="text-left text-xs p-2 hover:bg-gray-100 rounded"
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
        <Image src="/sort.png" alt="" width={14} height={14} />
      </button>
    </div>
  );
};

export default FilterAndSort;
