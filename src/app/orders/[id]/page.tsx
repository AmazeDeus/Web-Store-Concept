"use client"
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useCart, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInput";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/Menu/CartProduct";
import { useParams } from "next/navigation";
import { Order } from "@/app/types/Product";

const OrderPage: NextPage = () => {
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order>();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData: Order) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product, index) => (
              <CartProduct key={index} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
