"use client"; // "use client" make sure this component runs as a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEY } from "./lib/VerifyOtpResponse";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const response = localStorage.getItem(STORAGE_KEY);
    if (!response) {
      router.push("/auth/login");
    } else {
      router.push("/result");
    }
  }, [router]);

  return null; // Returning null since we're navigating and don't want to render anything
}
