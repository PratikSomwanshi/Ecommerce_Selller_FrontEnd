import ProductCard from "@/components/ProductCard/ProductCard";
import React from "react";

interface Product {
  _id: string;
  name: string;
  price: Number;
  image: string;
  description: string;
  category: string;
}

async function getMensProducts() {
  // try {
  //     let response;
  //     response = await fetch(
  //         "http://localhost:5000/api/v1/products/?category=kids",
  //         {
  //             cache: "no-store",
  //         }
  //     );
  //     if (response.ok) {
  //         const res = await response.json();
  //         return res.data;
  //     }
  // } catch (error) {
  //     return {
  //         error: "Failed to fetch the data",
  //     };
  // }
}

interface data {
  _id: string;
  name: string;
  image: string;
  price: Number;
  description: string;
  category: string;
}

const item: data = {
  _id: "1",
  name: "Shirt",
  image: "",
  price: 100,
  description: "This is a shirt",
  category: "kids",
};

async function page() {
  // const response = await getMensProducts();

  // if (response.error) {
  //   return (
  //     <div className="flex h-[44rem] w-full items-center justify-center">
  //       <h3 className="text-2xl">{response.error}</h3>
  //     </div>
  //   );
  // }

  return (
    <section className="container m-auto flex justify-center">
      <div className=" flex w-[70%] flex-wrap gap-8 p-4">
        {/* {response.map((item: Product) => { */}
        <ProductCard key={item._id} data={item} />;{/* })} */}
      </div>
    </section>
  );
}

export default page;
