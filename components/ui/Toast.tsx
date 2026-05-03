"use client";
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <ToastPrimitives.Provider>{children}</ToastPrimitives.Provider>;
}

export const Toast = ToastPrimitives.Root;
export const ToastClose = ToastPrimitives.Close;
export const ToastTitle = ToastPrimitives.Title;
export const ToastDescription = ToastPrimitives.Description;