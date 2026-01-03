import React, { useState, useEffect, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useDebounce } from "../../hooks/useDebounce";

const SearchBar = ({ onSearch, initialValue = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // ❌ Skip first render to avoid auto-fetch loop
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]); // ❗ remove onSearch from deps

  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); // explicit user action
  };

  return (
    <TextField
      fullWidth
      placeholder="Search movies by title or description..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end" size="small">
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
