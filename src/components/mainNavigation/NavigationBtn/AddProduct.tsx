import Link from "next/link";
import React from "react";

function AddProduct() {
  return (
    <Link href="/add_product">
      <div className="flex cursor-pointer items-center justify-center  bg-slate-100 px-3 py-6 hover:bg-slate-200">
        <h1>Add Product</h1>
      </div>
    </Link>
  );
}

export default AddProduct;
