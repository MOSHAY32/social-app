import { useState, useEffect } from "react";
import "./Search.css";
import { countries, categories } from "../data";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");


  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch({ query, country, category });
    }, 500);

    return () => clearTimeout(handler);
  }, [query, country, category]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by event name..."
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <select
        className="search"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;