import { Dispatch, FormEvent, SetStateAction } from "react";

export interface Extra {
  _id: string;
  price: number;
  name?: string;
}

export interface Size {
  _id: string;
  price: number;
  name?: string;
}

export interface ExtraIngredientPrice {
  _id: string;
  name?: string;
  price: number;
}

export interface Product {
  _id?: string;
  uniqueId?: string;
  name: string;
  image: string;
  basePrice: number;
  size?: Size;
  extras?: Extra[];
}

export interface ProductProps {
  product: Product;
  onRemove?: () => void;
}

export interface MenuItemProps {
  _id?: string;
  image: string;
  name: string;
  description: string;
  basePrice: number;
  category?: string;
  sizes: Size[];
  extraIngredientPrices: ExtraIngredientPrice[];
}

export interface MenuItemPriceProps {
  name: string;
  addLabel: string;
  props: ExtraIngredientPrice[];
  setProps: (
    props:
      | ((oldProps: ExtraIngredientPrice[]) => ExtraIngredientPrice[])
      | ExtraIngredientPrice[]
  ) => void;
}

export interface MenuItemTileProps {
  onAddToCart: () => void;
  image: string;
  description: string;
  name: string;
  basePrice: number;
  sizes: Size[];
  extraIngredientPrices: ExtraIngredientPrice[];
}

export interface MenuItemFormProps {
  onSubmit: (ev: FormEvent, data: MenuItemProps) => void;
  menuItem: MenuItemProps | null;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Order {
  _id: string;
  userEmail: string;
  createdAt: string;
  paid: boolean;
  cartProducts: Product[];
}

export interface CartProduct extends Product, MenuItemProps {
  size: { price: number; _id: string };
  extras: any[];
}

export interface FieldError {
  [key: string]: string[];
}

export type ErrorType = string | FieldError;

export interface CartContextType {
  cartProducts: CartProduct[];
  setCartProducts: Dispatch<SetStateAction<CartProduct[]>>;
  addToCart: (
    product: Product | MenuItemProps,
    size?: { price: number; _id: string },
    extras?: any[]
  ) => void;
  removeCartProduct: (idToRemove?: string) => void;
  clearCart: () => void;
  error: ErrorType | null;
  setError: Dispatch<SetStateAction<ErrorType | null>>;
}
