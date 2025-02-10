import { renderHook, waitFor } from "@testing-library/react-native";
import { useGetJokesInfiniteQuery } from "@/hooks/queries/useGetJokesInfiniteQuery";
import { api } from "@/api";
import { JokesResSchema } from "@/api/schemas/jokeSchema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/api", () => ({
  api: {
    getJokes: jest.fn(),
  },
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockJokes = {
  error: false,
  amount: 2,
  jokes: [
    {
      category: "Pun",
      type: "single",
      joke: "I was struggling to figure out how lightning works, but then it struck me.",
      flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
      },
      id: 220,
      safe: true,
      lang: "en",
    },
    {
      category: "Pun",
      type: "single",
      joke: "I'm reading a book about anti-gravity. It's impossible to put down!",
      flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
      },
      id: 126,
      safe: true,
      lang: "en",
    },
  ],
  timestamp: Date.now(),
};

const mockJokes2 = {
  error: false,
  amount: 2,
  jokes: [
    {
      category: "Pun",
      type: "single",
      joke: 'Today, my son asked "Can I have a book mark?" and I burst into tears.\n11 years old and he still doesn\'t know my name is Brian.',
      flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
      },
      id: 200,
      safe: true,
      lang: "en",
    },
    {
      category: "Pun",
      type: "single",
      joke: 'I have these weird muscle spasms in my gluteus maximus.\nI figured out from my doctor that everything was alright:\nHe said "Weird flex, butt okay."',
      flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
      },
      id: 82,
      safe: false,
      lang: "en",
    },
  ],
  timestamp: Date.now(),
};

describe("useGetJokesInfiniteQuery", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should fetch the initial page with correct parameters", async () => {
    (api.getJokes as jest.Mock).mockResolvedValue(mockJokes);

    const { result } = renderHook(
      () =>
        useGetJokesInfiniteQuery({
          category: "Pun",
          type: "single",
          amount: 10,
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(api.getJokes).toHaveBeenCalledWith({
      params: { category: "Pun" },
      queries: { type: "single", amount: 10 },
    });

    expect(result.current.data?.pages[0]).toEqual(
      JokesResSchema.parse(mockJokes)
    );
  });

  it("should fetch the next page correctly", async () => {
    const mockJokesPage1 = mockJokes;
    const mockJokesPage2 = mockJokes2;

    (api.getJokes as jest.Mock)
      .mockResolvedValueOnce(mockJokesPage1)
      .mockResolvedValueOnce(mockJokesPage2);

    const { result } = renderHook(
      () =>
        useGetJokesInfiniteQuery({
          category: "Pun",
          type: "single",
          amount: 2,
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    result.current.fetchNextPage();

    await waitFor(() => expect(result.current.data?.pages.length).toBe(2));

    expect(api.getJokes).toHaveBeenCalledTimes(3);
    expect(result.current.data?.pages[0]).toEqual(
      JokesResSchema.parse(mockJokesPage1)
    );
    expect(result.current.data?.pages[1]).toEqual(
      JokesResSchema.parse(mockJokesPage2)
    );
  });
});
