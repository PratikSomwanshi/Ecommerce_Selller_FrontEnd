import useStore from "@/store/seller";
import React, { Suspense, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { lazy } from "react";
import LocalSkeleton from "../skeletorn/Skeleton";
import Access from "../access/Access";
import axios from "axios";
import LoadingLogo from "../logo/loadingLogo";

const ProductCard = lazy(() => import("../ProductCard/ProductCard"));

interface Inputs {
  _id: string;
  name: string;
  image: string;
  price: Number;
  description: string;
  category: string;
}

function Home({ seller_id }: { seller_id: string }) {
  async function getRecentProduct(seller_id: string) {
    const data = await axios.post(
      `http://localhost:5000/api/v1/products/seller/recent`,
      {
        id: seller_id,
      },
    );

    return data;
  }

  const query = useQuery({
    queryKey: ["recent-products"],
    queryFn: () => getRecentProduct(seller_id),
  });

  if (query.isError) {
    const error = query.error as any;
    if (error.response) return <Access />;
    else
      return (
        <div className="center__screen__text">
          <h1>Failed to fetch the data</h1>
        </div>
      );
  }

  if (query.isLoading) return <LoadingLogo />;

  if (query.isSuccess)
    return (
      <section className="h-auto space-y-8 px-4 py-3 text-lg">
        <div className="h-full">
          <h1 className="mb-2">Your Recent Products</h1>
          <div className="flex h-auto w-full flex-wrap items-center justify-start  py-6">
            <div className="container-scroll flex h-auto w-auto">
              {query.data.data.data.map((product: Inputs) => {
                return (
                  <div className="h-[19rem] w-[22rem]   space-x-4">
                    <Suspense key={product._id} fallback={<LocalSkeleton />}>
                      <ProductCard data={product} />
                    </Suspense>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-full">
          <h1 className="mb-2">Your Popular Products</h1>
          <div className="flex h-auto w-full flex-wrap items-center justify-start  py-6">
            <div className="container-scroll flex h-auto w-auto">
              {query.data.data.data.map((product: Inputs) => {
                return (
                  <div className="h-[20rem] w-[22rem]   space-x-4">
                    <Suspense key={product._id} fallback={<LocalSkeleton />}>
                      <ProductCard data={product} />;
                    </Suspense>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
}

export default Home;
