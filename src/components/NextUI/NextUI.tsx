"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

function NextUI({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </CookiesProvider>
    </NextUIProvider>
  );
}

export default NextUI;
