"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { signInWithGoogle } from "../../../lib/auth";

import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle custom email/password sign-up logic here
  };

  const handleGoogleSignUp = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("Signed up with Google:", user);
      router.push("/finance/");
    } else {
      console.error("Google sign-up failed.");
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Your financial data has answers. Just ask."
    >
      <div className="mt-4 flex items-center justify-center">
        <Button onClick={handleGoogleSignUp} variant="google" fullWidth>
          Sign up with Google
        </Button>
      </div>

      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/onboard/signin"
          className="text-blue-600 hover:text-blue-700"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
