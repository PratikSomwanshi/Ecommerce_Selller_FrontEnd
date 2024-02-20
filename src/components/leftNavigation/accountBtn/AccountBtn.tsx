"use client";

import React from "react";
import { useCookies } from "react-cookie";

import LinksRegister from "./LinksRegister";
import LinksLogout from "./LinksLogout";
import useStore from "@/store/seller";

function AccountButton() {
  const { seller_id } = useStore();
  const data: any = sessionStorage.getItem("store");
  const localData = JSON.parse(data);
  // if (data) {

  //   if (localData.state.seller_id == "default") return <Access />;
  // }

  if (localData.state.seller_id == "default") {
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
