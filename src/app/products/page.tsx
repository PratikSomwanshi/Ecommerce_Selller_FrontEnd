import ProductCard from "@/components/ProductCard/ProductCard";
import LocalSkeleton from "@/components/skeletorn/Skeleton";
import React, { Suspense } from "react";

interface Product {
  _id: string;
  name: string;
  price: Number;
  image: string;
  description: string;
  category: string;
}

async function getMensProducts() {
  try {
    let response;
    response = await fetch("http://localhost:5000/api/v1/products", {
      cache: "no-store",
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
  const response = await getMensProducts();

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
