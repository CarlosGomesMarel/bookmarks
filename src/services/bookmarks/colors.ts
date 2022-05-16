export interface ColorInfo {
  backgroundColor: string;
  color: string;
}

export const BookmarkColors: Record<string, ColorInfo> = {
  darkGray: { backgroundColor: "#2c3e50", color: "white" },
  blue: { backgroundColor: "#007bff", color: "white" },
  indigo: { backgroundColor: "#6610f2", color: "white" },
  purple: { backgroundColor: "#6f42c1", color: "white" },
  pink: { backgroundColor: "#e83e8c", color: "black" },
  red: { backgroundColor: "#dc3545", color: "white" },
  orange: { backgroundColor: "#fd7e14", color: "black" },
  yellow: { backgroundColor: "#ffc107", color: "black" },
  green: { backgroundColor: "#28a745", color: "white" },
  teal: { backgroundColor: "#20c997", color: "black" },
  cyan: { backgroundColor: "#17a2b8", color: "black" },
  gray: { backgroundColor: "#6c757d", color: "white" },
  "gray-dark": { backgroundColor: "#343a40", color: "white" },
  primary: { backgroundColor: "#428bca", color: "white" },
  secondary: { backgroundColor: "#6c757d", color: "white" },
  success: { backgroundColor: "#28a745", color: "white" },
  info: { backgroundColor: "#17a2b8", color: "black" },
  warning: { backgroundColor: "#ffc107", color: "black" },
  danger: { backgroundColor: "#dc3545", color: "white" },
};

export const DefaultColorName = "primary";
export const DefaultColor = BookmarkColors[DefaultColorName];
