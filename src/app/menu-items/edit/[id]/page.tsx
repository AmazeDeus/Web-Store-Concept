"use client"
import { NextPage } from "next";
import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MenuItemProps } from "@/app/types/Product";
import { ProfileData } from "@/app/types/User";

const EditMenuItemPage: NextPage = () => {
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState<MenuItemProps | null>(null);
  const [redirectToItems, setRedirectToItems] = useState<boolean>(false);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items: MenuItemProps[]) => {
        const item = items.find((i) => i._id === id);
        item && setMenuItem(item);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleFormSubmit(ev: React.FormEvent, data: any) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });

    setRedirectToItems(true);
  }

  async function handleDeleteClick() {
    const promise = new Promise<void>(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!(data as ProfileData).admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Delete this menu item"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
};

export default EditMenuItemPage;
