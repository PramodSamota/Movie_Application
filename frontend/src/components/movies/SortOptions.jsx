import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { SORT_OPTIONS, SORT_ORDER } from "../../utils/constants";

const SortOptions = ({ sortBy, order, onSortChange }) => {
  const handleSortByChange = (event) => {
    onSortChange(event.target.value, order);
  };

  const handleOrderChange = (event, newOrder) => {
    if (newOrder !== null) {
      onSortChange(sortBy, newOrder);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: { xs: "stretch", sm: "center" },
      }}
    >
      <Typography variant="body1" sx={{ display: { xs: "none", sm: "block" } }}>
        Sort by:
      </Typography>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Sort Field</InputLabel>
        <Select value={sortBy} label="Sort Field" onChange={handleSortByChange}>
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ToggleButtonGroup
        value={order}
        exclusive
        onChange={handleOrderChange}
        size="medium"
      >
        <ToggleButton value={SORT_ORDER.ASC} aria-label="ascending">
          <ArrowUpward sx={{ mr: 1 }} />
          Ascending
        </ToggleButton>
        <ToggleButton value={SORT_ORDER.DESC} aria-label="descending">
          <ArrowDownward sx={{ mr: 1 }} />
          Descending
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default SortOptions;
