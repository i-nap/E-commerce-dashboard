import { ButtonProps } from "@/types/button";

const styles = {
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  variant: {
    primary:   "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger:    "bg-red-600 text-white hover:bg-red-700",
    ghost:     "bg-transparent text-gray-700 hover:bg-gray-100",
    outline:   "border border-gray-400 text-gray-700 hover:bg-gray-50",
  },
  size: {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  },
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.base} ${styles.variant[variant]} ${styles.size[size]} ${className}`}
    >
      {children}
    </button>
  );
}