import { useCallback, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { CategoriesType } from "@/api/schemas/categorySchema";
import { JokesReqType, JokeType } from "@/api/schemas/jokeSchema";
import { AccordionItem } from "@/components/AccordionItem";
import { Dialog } from "@/components/Dialog";
import { useGetCategoriesQuery } from "@/hooks/queries/useGetCategoriesQuery";
import { useGetJokesInfiniteQuery } from "@/hooks/queries/useGetJokesInfiniteQuery";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { Placeholder } from "@/components/Placeholder";
import { colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function HomeScreen() {
  const [jokesFilter, setJokesFilter] = useState<JokesReqType>({
    category: "",
    type: "single",
    amount: 2,
  });
  const [categoryOpen, setCategoryOpen] = useState<string | null>(null);
  const [jokeOpen, setJokeOpen] = useState<JokeType | null>(null);
  const [categories, setCategories] = useState<CategoriesType>([]);
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  const {
    data: jokesData,
    fetchNextPage,
    isFetchingNextPage: isFetchingNextJokes,
    isLoading: isLoadingJokes,
    refetch: refetchJokes,
  } = useGetJokesInfiniteQuery(jokesFilter, {
    enabled: !!jokesFilter.category,
  });

  const jokesList = useMemo(
    () => jokesData?.pages.flatMap((page) => page.jokes),
    [jokesData]
  );

  const handleJokesFilter = (filter: Partial<JokesReqType>) => {
    setJokesFilter((prev) => ({ ...prev, ...filter }));
  };

  const handleOpenAccordion = (category: string) => {
    handleJokesFilter({ category });
    setCategoryOpen(category);
  };

  const handleCloseAccordion = () => {
    setCategoryOpen(null);
  };

  const handleOpenDialog = (joke: JokeType) => {
    setJokeOpen(joke);
  };

  const handleCloseDialog = () => {
    setJokeOpen(null);
  };

  const handleCategoryMoveToTop = (selectedCategory: string) => {
    handleCloseAccordion();
    setCategories((prev) => [
      selectedCategory,
      ...prev.filter((cat) => cat !== selectedCategory),
    ]);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    handleCloseAccordion();
    queryClient.removeQueries({ queryKey: [QUERY_KEY.GET_JOKES] });
    await refetchCategories();
    await refetchJokes();
    setRefreshing(false);
  }, [refetchCategories, refetchJokes]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.categories);
    }
  }, [categoriesData]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Find Your Jokes",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerStyle,
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => (
            <AccordionItem
              key={item}
              isOpen={categoryOpen === item}
              onOpen={() => handleOpenAccordion(item)}
              onClose={handleCloseAccordion}
              renderTitle={() => (
                <View style={styles.categoryContainer}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryNumber}>{index + 1}</Text>
                    <Text style={styles.categoryTitle}>{item}</Text>
                  </View>
                  {index === 0 ? (
                    <Tag label="TOP" />
                  ) : (
                    <Button
                      title="Go Top"
                      variant="secondary"
                      onPress={() => handleCategoryMoveToTop(item)}
                    />
                  )}
                </View>
              )}
              renderExpanded={() => (
                <FlatList
                  data={jokesList}
                  keyExtractor={(joke, index) => `${index}-${joke.id}`}
                  renderItem={({ item: joke }) => (
                    <TouchableOpacity
                      onPress={() => handleOpenDialog(joke)}
                      style={styles.jokeItem}
                    >
                      <Text style={{ marginBottom: 12 }}>{joke.joke}</Text>
                    </TouchableOpacity>
                  )}
                  ListFooterComponent={
                    <>
                      <Placeholder
                        isVisible={isLoadingJokes || isFetchingNextJokes}
                      />
                      {(jokesList?.length || 0) < 6 && (
                        <Button
                          title="Add More Data"
                          variant="outline"
                          onPress={() => fetchNextPage()}
                          disabled={isLoadingJokes || isFetchingNextJokes}
                        />
                      )}
                    </>
                  }
                />
              )}
            />
          )}
          ListFooterComponent={
            isLoadingCategories ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : null
          }
        />

        <Dialog isVisible={!!jokeOpen} onClose={handleCloseDialog}>
          <Text>{jokeOpen?.joke}</Text>
        </Dialog>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  container: {
    flex: 1,
    marginTop: 12,
    padding: 12,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    gap: 24,
  },
  categoryNumber: {
    fontWeight: "bold",
  },
  categoryTitle: {
    fontWeight: "bold",
  },
  jokeItem: {
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    marginBottom: 8,
    padding: 8,
  },
});
