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
