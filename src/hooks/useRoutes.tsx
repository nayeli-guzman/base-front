import { useEffect, useState } from "react";
import { getAllRoutes } from "../services/RouteService/GetAllRoutes";
import { RouteResponseDto } from "../dtos/Route/RouteResponseDto";

const useRides = (page: number = 0) => {
  const [results, setResults] = useState<RouteResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getAllRoutes(page, { signal })
      .then((data) => {
        setResults((prev) => [...prev, ...data.content]);
        setHasNextPage(Boolean(data.content.length));
        setIsLoading(false);
        console.log(1);
        console.log(results);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [page]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useRides;
