import type { SxProps, Theme } from "@mui/material";

import { SUMMARY_ROW_MIN_WIDTH } from "~/daySummaries/definitions";

export const pageSx = {
  maxWidth: 1100,
  mx: "auto",
  px: { xs: 2, md: 3 },
  py: { xs: 2, md: 4 },
} satisfies SxProps<Theme>;

export const pageHeaderSx = {
  display: "flex",
  flexWrap: "wrap",
  gap: 2,
  alignItems: "flex-end",
  justifyContent: "space-between",
  mb: 3,
} satisfies SxProps<Theme>;

export const surfaceSx = {
  border: 1,
  borderColor: "divider",
  borderRadius: 3,
  bgcolor: "background.paper",
} satisfies SxProps<Theme>;

export const listScrollSx = {
  ...surfaceSx,
  height: { xs: 520, md: 640 },
  overflowY: "auto",
  overflowX: "auto",
  overscrollBehavior: "contain",
} satisfies SxProps<Theme>;

export const virtualRowSx = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
} satisfies SxProps<Theme>;

export const summaryRowSx = {
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr 1fr 0.9fr 0.9fr",
  columnGap: 2,
  alignItems: "center",
  borderBottom: 1,
  borderColor: "divider",
  px: 2,
} satisfies SxProps<Theme>;

export const incompleteRowSx = {
  opacity: 0.45,
} satisfies SxProps<Theme>;

export const metricLabelSx = {
  color: "text.secondary",
  fontSize: 12,
  letterSpacing: 0.4,
  textTransform: "uppercase",
} satisfies SxProps<Theme>;

export const metricValueSx = {
  fontVariantNumeric: "tabular-nums",
  fontWeight: 600,
} satisfies SxProps<Theme>;

export const statGridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
  gap: 2,
  mb: 3,
} satisfies SxProps<Theme>;

export const statCardSx = {
  ...surfaceSx,
  p: 2.5,
  display: "flex",
  flexDirection: "column",
  gap: 0.75,
} satisfies SxProps<Theme>;

export const dayLayoutSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
  gap: 3,
  alignItems: "start",
} satisfies SxProps<Theme>;

export const chartCardSx = {
  ...surfaceSx,
  p: 2,
} satisfies SxProps<Theme>;

export const centeredStateSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 1.5,
  py: 8,
  color: "text.secondary",
} satisfies SxProps<Theme>;

export const controlsRowSx = {
  display: "flex",
  flexWrap: "wrap",
  gap: 2,
} satisfies SxProps<Theme>;

export const navBarSx = {
  borderBottom: 1,
  borderColor: "divider",
  bgcolor: "background.paper",
  color: "text.primary",
} satisfies SxProps<Theme>;

export const navLinksSx = {
  display: "flex",
  gap: 1,
  ml: "auto",
} satisfies SxProps<Theme>;

export const dayHeaderRowSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 1.5,
} satisfies SxProps<Theme>;

export const virtualListSx = {
  position: "relative",
  minWidth: SUMMARY_ROW_MIN_WIDTH,
} satisfies SxProps<Theme>;

export const loaderRowSx = {
  display: "flex",
  justifyContent: "center",
  py: 2,
} satisfies SxProps<Theme>;
