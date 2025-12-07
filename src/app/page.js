"use client";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, []);

  return null;
}
