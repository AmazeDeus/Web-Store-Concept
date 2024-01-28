"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { cartProductPrice, useCart } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInput";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/Menu/CartProduct";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import { AddressProps, StreetAddress } from "../types/User";
import { Product } from "../types/Product";
import uniqid from "uniqid";

const CartPage: NextPage = () => {
  const [address, setAddress] = useState<AddressProps>({
    phone: "",
    streetAddress: {
      streetName: "",
      houseNumber: "",
      stairwell: "",
      apartment: "",
    },
    city: "",
    postalCode: "",
  });
  const { cartProducts, removeCartProduct } = useCart();
  const { data: profileData } = useProfile();
  console.log("P:", cartProducts);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(
    propName: string,
    value: string,
    name?: string | StreetAddress
  ) {
    if (propName === "streetAddress" && typeof name === "string") {
      setAddress((prevState) => ({
        ...prevState,
        [propName]: { ...prevState.streetAddress, [name]: value },
      }));
    } else {
      setAddress((prevState) => ({ ...prevState, [propName]: value }));
    }
  }

  async function proceedToCheckout(ev: React.FormEvent) {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise<void>((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  const groupedProducts = cartProducts.reduce((grouped: any, product: any) => {
    product["uniqueId"] = uniqid();
    if (product._id !== undefined) {
      (grouped[product._id] = grouped[product._id] || []).push(product);
      grouped[product._id]["productTitle"] = grouped[product._id][0].name || "Product";
    }
    return grouped;
  }, {});

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {Object.keys(groupedProducts).map((_id) => (
            <div key={_id}>
              <h1>{groupedProducts[_id].productTitle}</h1>
              {groupedProducts[_id].map((product: Product, index: any) => (
                <>
                  <CartProduct
                    key={index}
                    product={product}
                    onRemove={() => removeCartProduct(product.uniqueId)}
                  />
                </>
              ))}
            </div>
          ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subtotal}
              <br />
              $5
              <br />${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
