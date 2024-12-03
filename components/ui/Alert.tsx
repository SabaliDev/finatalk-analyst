import React, { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";

// Define props for Alert component
interface AlertProps {
  children: ReactNode;      // Specify the type for children
  className?: string;       // Optional className prop
  variant?: "default" | "destructive"; // Optional variant prop with specific values
}

export function Alert({ children, className, variant = "default" }: AlertProps) {
  // Define classes based on the variant
  const variantClass = variant === "destructive" ? "alert-destructive" : "alert-default";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className={`alert ${variantClass} ${className}`}>{children}</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {/* You might want to include content inside the AlertDialog */}
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Define props for AlertDescription component
interface AlertDescriptionProps {
  children: ReactNode; // Specify the type for children
}

export function AlertDescription({ children }: AlertDescriptionProps) {
  return <AlertDialogDescription>{children}</AlertDialogDescription>;
}
