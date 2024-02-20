"use client";
import AddProduct from "@/components/AddProduct";
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
      <AddProduct />
    </div>
  );
}

export default page;
