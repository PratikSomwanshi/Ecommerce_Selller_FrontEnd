import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    _id: string;
    name: string;
    image: string;
    price: Number;
    description: string;
    category: string;
  };
}

function ProductCard({ data }: Props) {
  return (
    <Link href={`/products/${data._id}`}>
      <section
        className="h-72 w-80 rounded-lg
            transition-all 
            hover:border hover:border-slate-200 hover:bg-slate-50 hover:shadow-lg
        "
      >
        <div className="p-1">
          <Image
            src={data.image}
            alt="something"
            width={200}
            height={300}
            className="h-40 w-full rounded-lg "
          />
        </div>
        <div className="flex h-28 flex-col justify-center space-y-1 px-3 py-1 text-xl text-slate-600">
          <h1 className="font-normal">{data.name}</h1>
          <h2 className="">&#x20B9;{JSON.stringify(data.price)}</h2>
        </div>
      </section>
    </Link>
  );
}

export default ProductCard;
