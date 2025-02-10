import { api } from "@/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_CATEGORIES],
    queryFn: () => api.getCategories(),
  });
};
