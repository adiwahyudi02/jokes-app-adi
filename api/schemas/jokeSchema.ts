import { z } from "zod";

export const JokesReqSchema = z.object({
  category: z.string(),
  type: z.string(),
  amount: z.number(),
});

const FlagsSchema = z.object({
  nsfw: z.boolean(),
  religious: z.boolean(),
  political: z.boolean(),
  racist: z.boolean(),
  sexist: z.boolean(),
  explicit: z.boolean(),
});

const JokeSchema = z.object({
  category: z.string(),
  type: z.string(),
  joke: z.string(),
  flags: FlagsSchema,
  id: z.number(),
  safe: z.boolean(),
  lang: z.string(),
});

const JokesSchema = z.array(JokeSchema);

export const JokesResSchema = z.object({
  jokes: JokesSchema,
  error: z.boolean(),
  amount: z.number(),
});

// Type inferences
export type JokesReqType = z.infer<typeof JokesReqSchema>;
export type JokesResType = z.infer<typeof JokesResSchema>;
export type JokesType = z.infer<typeof JokesSchema>;
export type JokeType = z.infer<typeof JokeSchema>;
