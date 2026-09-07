import { client } from "~/api/generated/client.gen";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

client.setConfig({ baseURL: API_BASE_URL });

export { client };
