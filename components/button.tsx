import { ButtonProps } from "@/types/button";

const styles = {
  base: "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  variant: {
    primary:       "bg-primary text-white hover:bg-primary/80",
    secondary:     "bg-secondary text-white hover:bg-secondary/80",
    danger:        "bg-danger text-white hover:bg-danger/80",
    ghost:         "bg-transparent text-foreground hover:bg-muted",
    outline:       "border border-secondary text-foreground bg-transparent hover:bg-muted",
    filter:        "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    "filter-active": "bg-primary text-white border border-primary",
  },
  size: {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  },
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${styles.base} ${styles.variant[variant]} ${styles.size[size]} ${className}`}
    >
      {children}
    </button>
  );
}