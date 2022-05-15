export interface ColorInfo {
  background: string;
  color: string;
}

export const LinkColors: Record<string, ColorInfo> = {
  darkGray: { background: "#2c3e50", color: "white" },
  blue: { background: "#007bff", color: "white" },
  indigo: { background: "#6610f2", color: "white" },
  purple: { background: "#6f42c1", color: "white" },
  pink: { background: "#e83e8c", color: "black" },
  red: { background: "#dc3545", color: "white" },
  orange: { background: "#fd7e14", color: "black" },
  yellow: { background: "#ffc107", color: "black" },
  green: { background: "#28a745", color: "white" },
  teal: { background: "#20c997", color: "black" },
  cyan: { background: "#17a2b8", color: "black" },
  gray: { background: "#6c757d", color: "white" },
  "gray-dark": { background: "#343a40", color: "white" },
  primary: { background: "#428bca", color: "white" },
  secondary: { background: "#6c757d", color: "white" },
  success: { background: "#28a745", color: "white" },
  info: { background: "#17a2b8", color: "black" },
  warning: { background: "#ffc107", color: "black" },
  danger: { background: "#dc3545", color: "white" },
};
