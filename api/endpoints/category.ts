import { makeEndpoint } from "@zodios/core";
import { CategoriesResSchema } from "../schemas/categorySchema";

export const categoryEndpoint = makeEndpoint({
  method: "get",
  path: "/categories",
  alias: "getCategories",
  description: "Fetch categories data",
  response: CategoriesResSchema,
});
