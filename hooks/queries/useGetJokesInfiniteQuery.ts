import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  InfiniteData,
} from "@tanstack/react-query";
import { api } from "@/api";
import {
  JokesReqType,
  JokesResSchema,
  JokesResType,
} from "@/api/schemas/jokeSchema";
import { QUERY_KEY } from "@/constants/queryKey";

export const useGetJokesInfiniteQuery = (
  { category, type, amount }: JokesReqType,
  options?: Omit<
    UseInfiniteQueryOptions<
      JokesResType,
      Error,
      InfiniteData<JokesResType>,
      JokesResType,
      [string, JokesReqType]
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >
) => {
  return useInfiniteQuery<
    JokesResType,
    Error,
    InfiniteData<JokesResType>,
    [string, JokesReqType]
  >({
    queryKey: [QUERY_KEY.GET_JOKES, { category, type, amount }],
    queryFn: async ({ pageParam = amount as number }) => {
      const response = await api.getJokes({
        params: { category },
        queries: {
          type,
          amount: pageParam as number,
        },
      });

      return JokesResSchema.parse(response);
    },
    initialPageParam: amount,
    getNextPageParam: (lastPage) => {
      return lastPage.jokes.length > 0 ? amount : undefined;
    },
    ...options,
  });
};
