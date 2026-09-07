import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/summaries.tsx"),
  route("day", "routes/day.tsx"),
] satisfies RouteConfig;
