import { z } from "zod";

const CategoriesSchema = z.array(z.string());

const CategoryAliasSchema = z.object({
  alias: z.string(),
  resolved: z.string(),
});

const CategoryAliasesSchema = z.array(CategoryAliasSchema);

export const CategoriesResSchema = z.object({
  categories: CategoriesSchema,
  categoryAliases: CategoryAliasesSchema,
  error: z.boolean(),
  timestamp: z.number(),
});

// Type inferences
export type CategoriesResType = z.infer<typeof CategoriesResSchema>;
export type CategoriesType = z.infer<typeof CategoriesSchema>;
export type CategoryAliasType = z.infer<typeof CategoryAliasSchema>;
export type CategoryAliasesType = z.infer<typeof CategoryAliasesSchema>;
