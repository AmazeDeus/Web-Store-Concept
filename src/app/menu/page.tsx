"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/Menu/MenuItem";
import { Category, MenuItemProps } from "../types/Product";

const MenuPage: NextPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories: Category[]) => setCategories(categories));
    });
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems: MenuItemProps[]) => setMenuItems(menuItems));
    });
  }, []);

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default MenuPage;
