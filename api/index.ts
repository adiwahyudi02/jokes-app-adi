import { makeApi, Zodios } from "@zodios/core";
import { categoryEndpoint } from "./endpoints/category";
import { jokeEndpoint } from "./endpoints/joke";

// Combine all endpoint arrays into a single array
const endpoints = makeApi([categoryEndpoint, jokeEndpoint]);
// Create the zodios client with the axios instance and the endpoints
export const api = new Zodios(" https://v2.jokeapi.dev", endpoints);
