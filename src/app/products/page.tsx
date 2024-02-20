"use client";
import Products from "@/components/Products";
import Access from "@/components/access/Access";
import LoadingLogo from "@/components/logo/loadingLogo";
import useStore from "@/store/seller";
import React from "react";

function page() {
  const local: any = sessionStorage.getItem("store");
  const data: any = JSON.parse(local);
  const { seller_id } = useStore();
  if (seller_id == "default") {
    if (data.state.seller_id == "default") return <Access />;
    else return <LoadingLogo />;
  }

  return (
    <div>
      <Products />
    </div>
  );
}

export default page;
