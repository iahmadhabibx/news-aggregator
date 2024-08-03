import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { formatDateString } from "../utils";

const Timeline = ({ isLoading, articles }) => {
  if (isLoading)
    return (
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap={5}
        flexWrap={"wrap"}
        h={"calc(100%-100px)"}
        w={"100%"}
      >
        {React.Children.toArray(
          [1, 2, 3, 4, 5, 6].map((loader) => (
            <Stack w={{ base: "100%", md: "360px" }} h={"400px"}>
              <Skeleton height="40px" />
              <Skeleton height="80%" />
            </Stack>
          ))
        )}
      </Stack>
    );

  return articles.length > 0 ? (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      gap={5}
      flexWrap={"wrap"}
      h={"calc(100%-100px)"}
      w={"100%"}
    >
      {React.Children.toArray(
        articles.map((article) => (
          <Card bg={"white"} w={{ base: "100%", md: "360px" }}>
            <CardHeader fontWeight={"bold"}>
              <Tooltip label={article.title}>
                <Text fontSize={{ base: "12px", sm: "16px" }}>
                  {article?.title?.length > 75
                    ? article.title?.substring(0, 75) + "..."
                    : article.title}
                </Text>
              </Tooltip>{" "}
              ~{" "}
              <Text fontWeight={"400"} fontStyle={"italic"} as={"span"}>
                {article.author}
              </Text>
            </CardHeader>
            <CardBody>
              <Text fontSize={{ base: "12px", sm: "16px" }}>
                {article.content}
              </Text>
              <Text
                fontSize={{ base: "12px", sm: "16px" }}
                mt={4}
                fontStyle={"italic"}
              >
                {formatDateString(article.publishedDate)}
              </Text>
            </CardBody>
            <CardFooter mx={"auto"}>
              <Link target="_blank" to={article?.url}>
                <Button
                  bg={"green.200"}
                  fontSize={{ base: "12px", sm: "16px" }}
                >
                  Read the full story
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </Stack>
  ) : (
    <Box h={"calc(100%-100px)"}>
      <Text textAlign={"center"}>There are no articles available!</Text>
    </Box>
  );
};

export default Timeline;
