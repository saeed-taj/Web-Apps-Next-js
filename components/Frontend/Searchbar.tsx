"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function Searchbar({
  placeholder = "Search for lawyers...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      alert(`You searched for: ${query}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center w-full max-w-md mx-auto"
    >
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>
    </form>
  );
}
