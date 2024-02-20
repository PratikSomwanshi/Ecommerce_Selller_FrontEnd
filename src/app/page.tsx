"use client";
import Home from "@/components/HomePage/Home";
import Access from "@/components/access/Access";
import LoadingLogo from "@/components/logo/loadingLogo";
import useStore from "@/store/seller";

function page() {
  const { seller_id } = useStore();

  const data: any = sessionStorage.getItem("store");
  if (data) {
    const localData = JSON.parse(data);

    if (localData.state.seller_id == "default") return <Access />;
  }

  if (seller_id == "default") return <LoadingLogo />;
  return <Home seller_id={seller_id} />;
}

export default page;
