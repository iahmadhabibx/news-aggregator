import axios from "axios";
import { useState } from "react";
import useFilterStore from "../store/filter";

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const GUARDIAN_API_URL = "https://content.guardianapis.com/search";
const NYT_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

const useArticles = () => {
  const { author, source } = useFilterStore();
  const [isLoading, setLoading] = useState(false);

  const fetchArticles = async (url, queryParams) => {
    try {
      const response = await axios.get(url, { params: queryParams });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Error: ${response.status}`);
    } catch (error) {
      console.error(`API call to ${url} failed: `, error);
      return null;
    }
  };

  const parseNewsApiResponse = (data) => {
    return data.articles.map((article) => ({
      title: article.title,
      url: article.url,
      content: article.content,
      author: article.author,
      source: article.source.name,
      publishedDate: article.publishedAt,
    }));
  };

  const parseGuardianApiResponse = (data) => {
    return data.response.results.map((article) => ({
      title: article.webTitle,
      url: article.webUrl,
      content:
        article.fields?.bodyText || "This article is about " + article.webTitle,
      author: article.sectionName,
      source: article.source,
      publishedDate: article.webPublicationDate,
    }));
  };

  const parseNytApiResponse = (data) => {
    return data.response.docs.map((article) => ({
      title: article.headline.main,
      url: article.web_url,
      content: article.abstract,
      author: article.byline.original,
      source: article.source,
      publishedDate: article.pub_date,
    }));
  };

  const onGetArticles = async (params, filter = undefined) => {
    const { search, page, pageSize } = params;
    setLoading(true);
    const apiResponses = await Promise.all([
      fetchArticles(NEWS_API_URL, {
        q: search,
        pageSize,
        apiKey: process.env.REACT_APP_NEWS_API,
      }),
      fetchArticles(GUARDIAN_API_URL, {
        q: search,
        page,
        "page-size": pageSize,
        "api-key": process.env.REACT_APP_THE_GUARDIAN,
      }),
      fetchArticles(NYT_API_URL, {
        q: search,
        page,
        "api-key": process.env.REACT_APP_NEW_YORK_TIMES_API_KEY,
      }),
    ]);

    let results = [];
    if (apiResponses[0]) {
      results = [...results, ...parseNewsApiResponse(apiResponses[0])];
    }
    if (apiResponses[1]) {
      results = [...results, ...parseGuardianApiResponse(apiResponses[1])];
    }
    if (apiResponses[2]) {
      results = [...results, ...parseNytApiResponse(apiResponses[2])];
    }

    setLoading(false);

    if (!filter) return results?.filter((r) => r.content !== "[Removed]");
    else if (author || source)
      return results?.filter((r) => r.author === author || r.source === source);
    switch (filter.type) {
      case "source":
        return results.filter(
          (s) => s.source?.toLowerCase() === filter.value?.toLowerCase()
        );
      case "author":
        return results.filter(
          (s) => s.author?.toLowerCase() === filter.value?.toLowerCase()
        );

      case "sources":
        if (!filter.value || !filter.value.length) return results;
        const betaValues = [];
        results.forEach((s) =>
          filter.value.forEach((val) => {
            if (s.source?.toLowerCase() === val?.toLowerCase())
              betaValues.push(s);
          })
        );
        return betaValues;

      case "publishedDate":
        return results.filter((s) => {
          const date1 = new Date(s.publishedDate);
          const date2 = new Date(filter.value);
          return date1.getTime() >= date2.getTime();
        });

      default:
        return results;
    }
  };

  return { isLoading, onGetArticles };
};

export default useArticles;
