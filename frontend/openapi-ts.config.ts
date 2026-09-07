import { defineConfig } from "@hey-api/openapi-ts";

const API_URL = process.env.API_URL ?? "http://localhost:8080";

export default defineConfig({
  input: `${API_URL}/v3/api-docs`,
  output: {
    path: "app/api/generated",
    format: "prettier",
  },
  plugins: ["@hey-api/typescript", "@hey-api/sdk", "@hey-api/client-axios"],
});
