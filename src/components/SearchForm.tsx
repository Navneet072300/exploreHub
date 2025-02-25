"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full space-x-2">
      <Input
        type="text"
        placeholder="Enter a research paper name (e.g. 'Attention is All You Need')"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow font-mono"
      />
      <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
        Search
      </Button>
    </form>
  );
}
