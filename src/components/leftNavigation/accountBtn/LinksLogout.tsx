"use client";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";

function LinksLogout() {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  return (
    <>
      <Link
        onClick={() => removeCookie("accessToken")}
        href="/"
        className="rounded-full border border-slate-600 px-2 py-1 "
      >
        Logout
      </Link>
    </>
  );
}

export default LinksLogout;
