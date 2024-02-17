"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import Access from "@/components/access/Access";
import LocalSkeleton from "@/components/skeletorn/Skeleton";
import useStore from "@/store/seller";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense, useEffect } from "react";
import { useCookies } from "react-cookie";

interface Product {
  _id: string;
  name: string;
  price: Number;
  image: string;
  description: string;
  category: string;
}

async function getMensProducts(seller_id: string) {
  try {
    let response;
    response = await fetch("http://localhost:5000/api/v1/products/seller", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ id: seller_id }),
    });
    if (response.ok) {
      const res = await response.json();
      console.log(res);
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to fetch the data",
    };
  }
}

async function page() {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  if (!cookies["accessToken"]) {
    return <Access />;
  }

  const { seller_id } = useStore();

  const response = await getMensProducts(seller_id);

  // const query = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () =>
  //     await fetch("http://localhost:5000/api/v1/products/seller", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       cache: "no-store",
  //       body: JSON.stringify({ id: seller_id }),
  //     }).then((res) => res.json()),
  // });

  // console.log(query);

  if (response.error) {
    return (
      <div className="flex h-[44rem] w-full items-center justify-center">
        <h3 className="text-2xl">{response.error}</h3>
      </div>
    );
  }

  return (
    <section className="container m-auto flex justify-center">
      <div className=" flex w-[70%] flex-wrap gap-8 p-4">
        {response.map((item: Product) => {
          return (
            <Suspense fallback={<LocalSkeleton />}>
              <ProductCard key={item._id} data={item} />
            </Suspense>
          );
        })}
      </div>
    </section>
  );
}

export default page;
