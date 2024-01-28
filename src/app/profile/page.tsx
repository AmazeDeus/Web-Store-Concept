"use client";
import { NextPage } from "next";
import { useEffect, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import { User } from "../types/User";
import { useFetch } from "@/hooks/useFetch";
import { useCart } from "@/components/AppContext";

const ProfilePage: NextPage = () => {
  const { data: session, status } = useSession();
  const { setError } = useCart();
  const fetcher = useFetch();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [profileFetched, setProfileFetched] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data: User) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev: FormEvent, data: User) {
    ev.preventDefault();

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      try {
        const response = await fetcher(
          "/api/profile",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
          setError
        ).catch((e) => {
          console.error(e);
          reject(new Error("Fetcher promise was rejected"));
        });

        if (response) resolve();
        else reject(new Error("No response received from fetcher"));
      } catch (e) {
        reject(new Error("Saving promise was rejected"));
      }
    });

    try {
      await toast.promise(savingPromise, {
        loading: "Saving...",
        success: "Profile saved!",
        error: "Error",
      });
    } catch (e) {
      console.error(e);
    }
  }

  if (status === "loading" || !profileFetched) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-3xl mx-auto mt-8">
        <UserForm
          user={user}
          onSave={handleProfileInfoUpdate}
          ownProfile={true}
        />
      </div>
    </section>
  );
};

export default ProfilePage;
