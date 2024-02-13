import Link from "next/link";
import React from "react";

function UpdateProduct() {
  return (
    <Link href="/update_product">
      <div className="flex cursor-pointer items-center justify-center border border-l-0 border-r-0 border-slate-400 bg-slate-100 px-3 py-6 hover:bg-slate-200">
        <h1>Update Product</h1>
      </div>
    </Link>
  );
}

export default UpdateProduct;
