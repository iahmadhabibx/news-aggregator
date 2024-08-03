import React, { useEffect, useState } from "react";
import { Container, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import useArticles from "../hooks/useArticles";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const { isLoading, onGetArticles } = useArticles();
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [params, setParams] = useState({
    search: "a",
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    onFetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFetchArticles = async (param = undefined) => {
    setParams((p) => ({
      ...p,
      page: param?.page ? param?.page : p.page,
    }));
    const data = await onGetArticles({
      ...params,
      page: param?.page ? param?.page : params.page,
    });
    const uniqueSources = [
      ...new Set(
        data
          ?.map((item) => item.source)
          .filter((source) => source && typeof source === "string")
      ),
    ];
   
    const uniqueAuthors = [
      ...new Set(
        data
          ?.map((item) => item.author)
          .filter((author) => author && typeof author === "string")
      ),
    ];

    setSources(uniqueSources);
    setAuthors(uniqueAuthors);
    setArticles(data);
  };

  const onFilter = async (type, value) => {
    const data = await onGetArticles(
      { ...params, pageSize: 20 },
      { type, value }
    );
    setArticles(data);
  };

  const onGetArticlesWithSearch = async (search) => {
    const data = await onGetArticles({ ...params, search });
    setParams((prev) => ({ ...prev, search }));
    setArticles(data);
  };

  return (
    <Container maxWidth={{ base: "500px", md: "1200px" }}>
      <Header
        isLoading={isLoading}
        sources={sources}
        authors={authors}
        onFilter={onFilter}
        onSearch={onGetArticlesWithSearch}
      />
      <Timeline isLoading={isLoading} articles={articles} />

      <Flex justifyContent={"center"} gap={8} mt={10} mb={5}>
        <ArrowLeftIcon
          w={8}
          h={8}
          p={2}
          rounded={"6px"}
          cursor={params.page > 1 ? "pointer" : "not-allowed"}
          _hover={{
            bg: "rgba(0,0,0,0.078)",
          }}
          onClick={() =>
            params.page > 1 ? onFetchArticles({ page: params.page - 1 }) : {}
          }
        />
        <ArrowRightIcon
          w={8}
          h={8}
          p={2}
          rounded={"6px"}
          cursor={"pointer"}
          _hover={{
            bg: "rgba(0,0,0,0.078)",
          }}
          onClick={() => onFetchArticles({ page: params.page + 1 })}
        />
      </Flex>
    </Container>
  );
};

export default HomePage;
