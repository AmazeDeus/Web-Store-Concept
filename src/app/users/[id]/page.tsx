"use client";
import { NextPage } from "next";
import { useEffect, useState, FormEvent } from "react";
import toast from "react-hot-toast";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useParams } from "next/navigation";
import { User } from "@/app/types/User";

const EditUserPage: NextPage = () => {
  const { loading, data } = useProfile();
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`/api/profile?_id=${id}`)
      .then((res) => res.json())
      .then((user: User) => {
        setUser(user);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveButtonClick = async (ev: FormEvent, data: User) => {
    ev.preventDefault();
    const promise = new Promise<void>(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "An error has occurred while saving the user",
    });
  };

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  if (!data?.admin) {
    return <p>Not an admin</p>;
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
};

export default EditUserPage;
