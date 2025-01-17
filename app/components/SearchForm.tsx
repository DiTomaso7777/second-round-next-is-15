'use client'
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-100 rounded-md px-3 py-2"
    >
      <Search className="h-4 w-4 text-gray-600" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a phone..."
        className="flex-1 bg-transparent ml-2 outline-none"
        style={{ fontSize: '16px' }} // Prevents iOS zoom
      />
      <button 
        type="submit"
        className="flex-shrink-0 ml-2 p-2 hover:text-blue-600 transition-colors"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchForm;