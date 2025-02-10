import { renderHook, waitFor } from "@testing-library/react-native";
import { useGetCategoriesQuery } from "@/hooks/queries/useGetCategoriesQuery";
import { api } from "@/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CategoriesResType } from "@/api/schemas/categorySchema";

jest.mock("@/api", () => ({
  api: {
    getCategories: jest.fn(),
  },
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// Type-safe mock data
const mockCategories: CategoriesResType = {
  categories: ["Any", "Misc"],
  categoryAliases: [
    {
      alias: "Miscellaneous",
      resolved: "Misc",
    },
    {
      alias: "Coding",
      resolved: "Programming",
    },
  ],
  error: false,
  timestamp: Date.now(),
};

describe("useGetCategoriesQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch categories correctly", async () => {
    (api.getCategories as jest.Mock).mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useGetCategoriesQuery(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify API call
    expect(api.getCategories).toHaveBeenCalledTimes(1);

    // Validate the fetched data
    expect(result.current.data).toEqual(mockCategories);
    expect(result.current.isSuccess).toBe(true);
  });
});
