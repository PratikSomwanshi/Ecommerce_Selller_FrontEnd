"use client";
import Home from "@/components/HomePage/Home";
import Access from "@/components/access/Access";
import { useCookies } from "react-cookie";

function page() {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  if (!cookies["accessToken"]) {
    return <Access />;
  }

  return <Home />;
}

export default page;
