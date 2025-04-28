"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IAuthRedirectProps {
  to: string;
  condition: "isLoggedIn" | "isLoggedOut";
}

export const AuthRedirect = ({ to, condition }: IAuthRedirectProps) => {
  const router = useRouter();
  const { data, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!data && condition === "isLoggedOut") {
      router.push(to);
    }
    if (data && condition === "isLoggedIn") {
      router.push(to);
    }
  }, [data, router, condition, to, isLoading]);

  return null;
};
