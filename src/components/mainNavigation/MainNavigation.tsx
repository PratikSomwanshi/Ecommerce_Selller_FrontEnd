import React from "react";
import AddProduct from "./NavigationBtn/AddProduct";
import DeleteProduct from "./NavigationBtn/DeleteProduct";
import UpdateProduct from "./NavigationBtn/UpdateProduct";

function MainNavigation() {
  return (
    <section className="w-64 border border-b-0 border-l-0 border-r-2 border-t-0 border-slate-300 bg-slate-100 text-lg">
      <AddProduct />
      <DeleteProduct />
    </section>
  );
}

export default MainNavigation;
