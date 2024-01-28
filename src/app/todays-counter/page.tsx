"use client";
import { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { ProfileData, User } from "../types/User";
import classes from "@/app/CSS/FramedImage.module.scss";
import EditableImage from "@/components/layout/EditableImage";
import { useFetch } from "@/hooks/useFetch";
import toast from "react-hot-toast";
import { useCart } from "@/components/AppContext";

const TodaysCounterPage: NextPage = () => {
  const [image, setImage] = useState<string>("");
  const { loading, data } = useProfile();
  const { setError } = useCart();
  const fetcher = useFetch();

  useEffect(() => {
    fetch("/api/todays-counter").then((res) => {
      try {
        res.json().then((counterImage: [{ image: string }]) => {
          setImage(counterImage[0].image);
        });
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  console.log("IMAGE:", image);
  if (loading) {
    return "Loading info...";
  }

  if (!(data as ProfileData).admin) {
    return "Not an admin.";
  }

  async function handleImageUpdate(
    ev: FormEvent,
    method = "GET",
    data: { image: string }
  ) {
    ev.preventDefault();

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      let options = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: "",
      };
      if (method !== "GET") {
        options = {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
      }

      try {
        const response = await fetcher(
          "/api/todays-counter",
          options,
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

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <div className={`text-center mb-20 flex flex-col`}>
          <div className={classes.frame}>
            <EditableImage link={image} setLink={setImage} width="1376px" height="512px" />
          </div>
          <form
            className="grow mt-12 w-4/12 self-center"
            onSubmit={(ev) => handleImageUpdate(ev, "PUT", { image })}
          >
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TodaysCounterPage;
