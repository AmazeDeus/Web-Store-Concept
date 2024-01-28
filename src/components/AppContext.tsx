"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import {
  Product,
  CartContextType,
  MenuItemProps,
  CartProduct,
  ErrorType,
} from "@/app/types/Product";
import { AppProviderProps } from "@/app/types/Children";
import toast from "react-hot-toast";
import Errors from "./Errors";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function cartProductPrice(cartProduct: Product) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras && cartProduct.extras.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export function AppProvider({ children }: AppProviderProps) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls) {
      const cart = ls.getItem("cart");
      if (cart) {
        setCartProducts(JSON.parse(cart));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(uniqueIdToRemove?: string) {
    if(!uniqueIdToRemove) {
      toast.error("No 'unique id' value received. Cannot delete.");
      return;
    }

    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (product) => product.uniqueId !== uniqueIdToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product removed");
  }

  function saveCartProductsToLocalStorage(cartProducts: Product[]) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(
    product: Product | MenuItemProps,
    size = { price: 0 },
    extras: any[] = []
  ) {
    setCartProducts((prevProducts: CartProduct[]) => {
      const cartProduct: CartProduct = {
        ...product,
        size,
        extras,
      } as CartProduct;
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
          error,
          setError,
        }}
      >
        <Errors />
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
