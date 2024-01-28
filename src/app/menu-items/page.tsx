"use client";
import { NextPage } from "next";
import { FC, useEffect, useState } from "react";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { MenuItemProps } from "../types/Product";
import { ProfileData } from "../types/User";

const MenuItemsPage: NextPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems: MenuItemProps[]) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!(data as ProfileData).admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image || "/logo.png"}
                    alt={""}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItemsPage;