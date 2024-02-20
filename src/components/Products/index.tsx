"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import Access from "@/components/access/Access";
import LocalSkeleton from "@/components/skeletorn/Skeleton";
import useStore from "@/store/seller";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: Number;
  image: string;
  description: string;
  category: string;
}

function Products() {
  const { seller_id } = useStore();
  const data: any = sessionStorage.getItem("store");
  if (data) {
    const localData = JSON.parse(data);

    if (localData.state.seller_id == "default") return <Access />;
  }

  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await fetch("http://localhost:5000/api/v1/products/seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ id: seller_id }),
      }).then((res) => res.json()),
  });

  // console.log(query);

  if (query.isError) {
    return (
      <div className="flex h-[44rem] w-full items-center justify-center">
        <h3 className="text-2xl">{JSON.stringify(query.error)}</h3>
      </div>
    );
  }

  if (query.isSuccess)
    return (
      <section className="container m-auto flex justify-center">
        <div className=" flex w-[70%] flex-wrap gap-8 p-4">
          {query.data.data.map((item: Product) => {
            return (
              <Suspense key={item._id} fallback={<LocalSkeleton />}>
                <ProductCard key={item._id} data={item} />
              </Suspense>
            );
          })}
        </div>
      </section>
    );
}

export default Products;
