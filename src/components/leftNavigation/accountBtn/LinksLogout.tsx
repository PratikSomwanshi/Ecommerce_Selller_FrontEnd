"use client";
import useStore from "@/store/seller";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";

function LinksLogout() {
  const { removeSellerId } = useStore();
  return (
    <>
      <Link
        onClick={() => {
          removeSellerId("default");
        }}
        href="/"
        className="rounded-full border border-slate-600 px-2 py-1 "
      >
        Logout
      </Link>
    </>
  );
}

export default LinksLogout;
