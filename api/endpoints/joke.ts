import { z } from "zod";
import { makeEndpoint } from "@zodios/core";
import { JokesResSchema } from "../schemas/jokeSchema";

export const jokeEndpoint = makeEndpoint({
  method: "get",
  path: "/joke/:category",
  alias: "getJokes",
  description: "Fetch jokes data",
  parameters: [
    { name: "category", type: "Path", schema: z.string() },
    { name: "type", type: "Query", schema: z.string() },
    { name: "amount", type: "Query", schema: z.number() },
  ],
  response: JokesResSchema,
});
