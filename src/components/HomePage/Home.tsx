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

// function Home() {
//   const { seller_id } = useStore();

//   let query: any;
//   query = useQuery({
//     queryKey: ["recent-products"],
//     queryFn: getRecentProduct,
//   });

//   if (seller_id == "default") {
//     query = useQuery({
//       queryKey: ["recent-products"],
//       queryFn: getRecentProduct,
//     });
//     return;
//   }

//   if (query && query.isError) {
//     if (seller_id == "default") return <Access />;
//     else return <div>error</div>;
//   }

//   if (seller_id == "default") {
//     return <div>loading...</div>;
//   }

//   if (query && query.isSuccess) {
//     return (
//       <section className="h-auto space-y-8 px-4 py-8 text-lg">
//         <div className="h-full">
//           <h1 className="mb-2">Your Recent Products</h1>
//           <div className="flex h-[30rem] w-full flex-wrap bg-red-200">
//             {query.data.data[0] ? (
//               query.data.data.map((product: Inputs) => {
//                 return (
//                   <Suspense fallback={<LocalSkeleton />}>
//                     <ProductCard data={product} />
//                   </Suspense>
//                 );
//               })
//             ) : (
//               <h1>error: {query.data.error.explanation}</h1>
//             )}
//           </div>
//         </div>
//         <div className="h-full">
//           <h1 className="mb-2">Your Popular Products</h1>
//           <div className="h-[30rem] w-full bg-red-200">
//             {/* {data.map((product: Inputs) => {
//             return <ProductCard data={product} />;
//           })} */}
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

function Home({ seller_id }: { seller_id: string }) {
  // console.log(seller_id);
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
      <section className="h-auto space-y-8 px-4 py-8 text-lg">
        <div className="h-full">
          <h1 className="mb-2">Your Recent Products</h1>
          <div className="flex h-[35rem] w-full flex-wrap items-center justify-center ">
            {query.data.data.data.map((product: Inputs) => {
              return (
                <Suspense key={product._id} fallback={<LocalSkeleton />}>
                  <ProductCard data={product} />;
                </Suspense>
              );
            })}
          </div>
        </div>
        <div className="h-full">
          <h1 className="mb-2">Your Popular Products</h1>
          <div className="flex h-[35rem] w-full flex-wrap items-center justify-center gap-4 ">
            {query.data.data.data.map((product: Inputs) => {
              return (
                <Suspense key={product._id} fallback={<LocalSkeleton />}>
                  <ProductCard data={product} />;
                </Suspense>
              );
            })}
          </div>
        </div>
      </section>
    );
}

export default Home;
