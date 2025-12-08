"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, MapPin, Search, Sparkles, Target } from "lucide-react";

type Lawyer = {
  id: string;
  name: string;
  specialization: string;
  location: string;
  rating?: number;
};

interface SearchBarProps {
  placeholder?: string;
  onResults?: (results: Lawyer[]) => void;
  defaultLocation?: string;
}

const specialties = [
  "Family Law",
  "Criminal Law",
  "Corporate Law",
  "Property Law",
  "Immigration",
  "Civil Litigation",
  "Employment Law",
  "Cyber Crime",
  "Trademark & IP",
  "Startup / Contracts",
  "Bail & FIR",
  "Divorce / Khula",
];

export default function Searchbar({
  placeholder = "Search for lawyers, cases, courts",
  onResults,
  defaultLocation = "Islamabad",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(defaultLocation);
  const [openPanel, setOpenPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const filteredSpecialties = useMemo(() => {
    if (!query) return specialties;
    return specialties.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpenPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDetectLocation = () => {
    if (navigator?.geolocation) {
      setLocation("Detecting...");
      navigator.geolocation.getCurrentPosition(
        () => setLocation("Near you"),
        () => setLocation(defaultLocation)
      );
    } else {
      setLocation(defaultLocation);
    }
  };

  const runSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (location) params.set("location", location);
      const response = await fetch(`/api/lawyers/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to fetch lawyers");
      }

      onResults?.(data.lawyers || []);
      setOpenPanel(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch();
  };

  return (
    <div className="relative w-full" ref={panelRef}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 bg-white/90 border border-white/40 shadow-xl rounded-2xl p-3 backdrop-blur"
      >
        <div className="flex items-center gap-2 w-full md:w-1/3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <MapPin className="text-gray-500 h-5 w-5" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or area"
            className="w-full bg-transparent focus:outline-none text-gray-800 placeholder:text-gray-400"
            onFocus={() => setOpenPanel(true)}
          />
          <button
            type="button"
            onClick={handleDetectLocation}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Detect
          </button>
        </div>

        <div className="flex items-center gap-2 w-full md:flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm relative">
          <Search className="text-gray-500 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent focus:outline-none text-gray-800 placeholder:text-gray-400"
            onFocus={() => setOpenPanel(true)}
          />
          <button
            type="submit"
            className="ml-auto inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            <span>Search</span>
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {openPanel && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-2xl rounded-2xl border border-gray-200 p-4 max-h-[360px] overflow-y-auto z-20">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Sparkles className="h-4 w-4" />
            Popular specialities
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredSpecialties.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuery(item);
                  runSearch();
                }}
                className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-3 hover:border-blue-500 hover:bg-blue-50 text-left transition"
              >
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <Target className="h-4 w-4 text-blue-500" />
                  {item}
                </div>
                <span className="text-xs text-gray-500">Specialty</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
