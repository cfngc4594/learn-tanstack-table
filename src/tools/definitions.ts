import { toolDefinition } from "@tanstack/ai";
import { z } from "zod";

export const updateThemeDef = toolDefinition({
  name: "update_theme",
  description: "Update the theme with new information",
  inputSchema: z.object({
    theme: z.enum(["system", "light", "dark"]).describe("Theme to update"),
  }),
  outputSchema: z.object({
    success: z.boolean(),
  }),
});

export const globalSearchDef = toolDefinition({
  name: "global_search",
  description: "Search data globally based on a search query",
  inputSchema: z.object({
    query: z.string().describe("The search query to search data"),
  }),
  outputSchema: z.object({
    resultCount: z.number().describe("Number of items found"),
  }),
});
