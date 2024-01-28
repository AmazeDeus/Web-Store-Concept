"use client";
import React, { useEffect, useState, FC } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/Menu/MenuItem";
import Image from "next/image";
import { MenuItemProps } from "@/app/types/Product";
import classes from "@/app/CSS/FramedImage.module.scss";

const HomeMenu: FC = () => {
  const [bestSellers, setBestSellers] = useState<MenuItemProps[]>([]);
  const [todaysCounter, setTodaysCounter] = useState<string>("");

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((menuItems: MenuItemProps[]) => {
        setBestSellers(menuItems.slice(-3));
      });
  }, []);

  useEffect(() => {
    fetch("/api/todays-counter").then((res) => {
      try {
        res.json().then((counterImage: [{ image: string }]) => {
          setTodaysCounter(counterImage[0].image);
        });
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  return (
    <section className="mt-16">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={"/sallad1.png"} width={109} height={189} alt={"sallad"} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={"/sallad2.png"} width={107} height={195} alt={"sallad"} />
        </div>
      </div>
      {todaysCounter && (
        <div className={`text-center mb-20 ${classes.frame}`}>
          <SectionHeaders
            subHeader={"Check out"}
            mainHeader={"Today's Meat Counter"}
          />
          <Image
            src={todaysCounter}
            alt="Meat counter of the day"
            width={1376}
            height={512}
          />
        </div>
      )}
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
        <div className="grid sm:grid-cols-3 gap-4">
          {bestSellers?.length > 0 &&
            bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
