"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";
import { useEffect, ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/onboard/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return null; // Prevents flashing of protected content
  }

  return <>{children}</>;
};

export default ProtectedRoute;