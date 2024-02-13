"use client";

import React from "react";
import { useCookies } from "react-cookie";

import LinksRegister from "./LinksRegister";
import LinksLogout from "./LinksLogout";

function AccountButton() {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  if (!cookies.accessToken) {
    return (
      <div className="flex h-full w-full items-center justify-between">
        <LinksRegister />
      </div>
    );
  } else {
    return (
      <div className="flex h-full w-full items-center justify-between">
        <LinksLogout />
      </div>
    );
  }
}

export default AccountButton;
