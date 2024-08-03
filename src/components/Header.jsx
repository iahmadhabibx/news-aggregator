import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Search from "./Search";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useDebounce from "../hooks/useDebounce";
import useFilterStore from "../store/filter";

const Header = ({ isLoading, onSearch, authors, sources, onFilter }) => {
  const [searchDate, setSearchDate] = useState("");
  const debouncedSearchTerm = useDebounce(searchDate, 1500);
  const {
    sources: zustandSources,
    setSources,
    removeSource,
    setAuthor,
    setSource,
    author,
    source: zustandSource,
  } = useFilterStore((state) => state);

  useEffect(() => {
    if (debouncedSearchTerm) onFilter("publishedDate", debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <Box h={{ base: "150px", md: "110px" }} py={2}>
      <HStack
        justifyContent={"center"}
        flexDirection={{ base: "column", md: "row" }}
      >
        {isLoading ? (
          <Skeleton w={"250px"} h={"40px"} />
        ) : (
          <Search onSearch={onSearch} />
        )}
        <Flex
          alignItems={"center"}
          gap={{ base: 0.5, md: 2 }}
          flexDirection={"row"}
        >
          {isLoading ? (
            <Skeleton w={"80px"} h={"40px"} />
          ) : (
            sources.length > 0 && (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  fontSize={{ base: "12px", md: "16px" }}
                >
                  {zustandSource || "Filter"}
                </MenuButton>
                <MenuList>
                  {React.Children.toArray(
                    sources.map((source) => (
                      <MenuItem
                        onClick={() => {
                          setSource(source);
                          onFilter("source", source);
                        }}
                      >
                        {source}
                      </MenuItem>
                    ))
                  )}
                </MenuList>
              </Menu>
            )
          )}

          {isLoading ? (
            <Skeleton w={"80px"} h={"40px"} />
          ) : (
            authors.length > 0 && (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  fontSize={{ base: "12px", md: "16px" }}
                >
                  {author || "Author"}
                </MenuButton>
                <MenuList>
                  {React.Children.toArray(
                    authors.map((author) => (
                      <MenuItem
                        onClick={() => {
                          setAuthor(author);
                          onFilter("author", author);
                        }}
                      >
                        {author}
                      </MenuItem>
                    ))
                  )}
                </MenuList>
              </Menu>
            )
          )}

          {isLoading ? (
            <Skeleton w={{ base: "120px", md: "150px" }} h={"40px"} />
          ) : (
            <Input
              w={{ base: "120px", md: "150px" }}
              fontSize={{ base: "12px", md: "16px" }}
              type="date"
              bg={"white"}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          )}
        </Flex>
      </HStack>

      <HStack alignItems={"center"} justifyContent={"center"} pt={3}>
        {isLoading ? (
          <Skeleton w={"80px"} h={"40px"} />
        ) : (
          <Text fontWeight={"bold"}>Sources:</Text>
        )}
        <Flex direction={"row"} flexWrap={"wrap"} gap={3}>
          {React.Children.toArray(
            sources.map((source) => (
              <Badge
                cursor={"pointer"}
                p={"2px 4px"}
                variant={
                  zustandSources.some((s) => s === source) ? "solid" : "outline"
                }
                colorScheme="green"
                onClick={() => {
                  zustandSources.some((s) => s === source)
                    ? removeSource(source)
                    : setSources(source);

                  const _sources = zustandSources.some((s) => s === source)
                    ? zustandSources.slice().filter((s) => s !== source)
                    : [...zustandSources, source];
                  onFilter("sources", _sources);
                }}
              >
                {source}
              </Badge>
            ))
          )}
        </Flex>

        <Button
          size={"sm"}
          variant={"solid"}
          bg={"red"}
          color={"white"}
          onClick={() => window.location.reload()}
        >
          x Clear Filters
        </Button>
      </HStack>
    </Box>
  );
};

export default Header;
