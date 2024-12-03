"use client"; // Add this at the top
import React, { useState } from "react";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { signInWithGoogle } from "../../../lib/auth";

import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleGoogleSignUp = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("Signed up with Google:", user);
      router.push("/finance/");
    } else {
      console.error("Google sign-up failed.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex items-center justify-center">
          <Button onClick={handleGoogleSignUp} variant="google" fullWidth>
            Sign In with Google
          </Button>
        </div>

        <p className="mt-4 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:text-blue-700">
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
