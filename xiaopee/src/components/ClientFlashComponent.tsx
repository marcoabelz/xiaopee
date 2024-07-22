"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ClientFlashComponent = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setErrorMessage(searchParams.get("error"));
    }

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return <>{errorMessage && <p className="animate-pulse rounded bg-red-400 px-4 py-2 text-center text-white">{errorMessage}</p>}</>;
};

export default ClientFlashComponent;
