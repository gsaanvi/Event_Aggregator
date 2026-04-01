"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth({ requiredRole } = {}) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sb-token");
    if (!token) {
      router.push("/login");
      setLoading(false);
      return;
    }

    const storedProfile = localStorage.getItem("sb-profile");
    const parsedProfile = storedProfile ? JSON.parse(storedProfile) : null;
    setProfile(parsedProfile);

    if (requiredRole && parsedProfile?.role !== requiredRole) {
      router.push(parsedProfile?.role === "admin" ? "/admin" : "/feed");
    }

    setLoading(false);
  }, [requiredRole, router]);

  return { profile, loading };
}
