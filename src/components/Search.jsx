import React, { useEffect, useState } from "react";
import { HStack, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import useDebounce from "../hooks/useDebounce";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) onSearch(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (e.target.value === "") onSearch("");
  };

  return (
    <HStack
      gap={2}
      borderWidth={"1px"}
      borderColor={"gray.400"}
      rounded={"10px"}
      p={"2px 4px"}
      bg={"white"}
    >
      <Input
        placeholder="Search article..."
        value={searchTerm}
        onChange={handleSearch}
        border={"none"}
        outline={"none"}
        _focusVisible={{
          outline: "none",
          border: "none",
        }}
      />
      <SearchIcon h={5} w={5} color={"gray.400"} mr={3} />
    </HStack>
  );
};

export default Search;
