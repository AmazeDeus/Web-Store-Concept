import { useEffect, useState } from "react";
import { ProfileData } from "@/app/types/User";

export function useProfile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data: ProfileData) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);

  return { loading, data };
}
