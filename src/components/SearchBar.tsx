import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-5 py-3 pl-12 pr-4 text-gray-800 bg-white/60 border border-blue-200 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/80 transition-all"
        />
        <Search className="absolute left-4 top-3 h-5 w-5 text-blue-400" />
      </div>
    </form>
  );
}