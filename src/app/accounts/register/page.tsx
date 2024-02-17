"use client";
import Register from "@/components/Register/Register";
import Access from "@/components/access/Access";
import React from "react";
import { useCookies } from "react-cookie";

function page() {
  return (
    <section className="flex h-[44rem] w-full items-center justify-center ">
      <Register />
    </section>
  );
}

export default page;
