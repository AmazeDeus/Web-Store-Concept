"use client";
import { NextPage } from "next";
import { useState } from "react";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import toast from "react-hot-toast";
import { ProfileData } from "@/app/types/User";
import { cleanData } from "@/utils/cleanData";

const NewMenuItemPage: NextPage = () => {
  const [redirectToItems, setRedirectToItems] = useState<boolean>(false);
  const { loading, data } = useProfile();

  async function handleFormSubmit(
    ev: React.FormEvent,
    data: any
  ): Promise<void> {
    ev.preventDefault();
    const cleanedData = cleanData(data);
    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(cleanedData),
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
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
};

export default NewMenuItemPage;
