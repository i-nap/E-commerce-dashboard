import { Product } from "./product";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline" | "filter" | "filter-active";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}


export interface AddToCartButtonProps {
    product: Product;
    quantity?: number;
    className?: string;
}