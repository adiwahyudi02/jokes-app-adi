import { QueryClient, QueryCache } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const showErrorToast = (message: string) => {
  Toast.show({
    type: "error",
    text1: "An error occurred",
    text2: message,
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Set stale time to 60 seconds
      retry: 2, // Retry failed queries up to 2 times
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      showErrorToast(errorMessage);
    },
  }),
});
