import React, { useState } from "react";

const Filter = ({ setFilters }) => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  const applyFilters = () => {
    setFilters({ date, category, source });
  };

  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Source"
      />
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;
