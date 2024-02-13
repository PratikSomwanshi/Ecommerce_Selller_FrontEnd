import Link from "next/link";
import React from "react";

function DeleteProduct() {
  return (
    <Link href="/products">
      <div className="border-b-1 flex  cursor-pointer items-center justify-center border border-l-0 border-r-0 border-slate-400 bg-slate-100 px-3 py-6 hover:bg-slate-200">
        <h1>All Products</h1>
      </div>
    </Link>
  );
}

export default DeleteProduct;
