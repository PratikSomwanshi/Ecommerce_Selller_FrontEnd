import React from "react";

function Home() {
  return (
    <section className="h-auto space-y-8 px-4 py-8 text-lg">
      <div className="h-full">
        <h1 className="mb-2">Your Recent Products</h1>
        <div className="h-[30rem] w-full bg-red-200"></div>
      </div>
      <div className="h-full">
        <h1 className="mb-2">Your Popular Products</h1>
        <div className="h-[30rem] w-full bg-red-200"></div>
      </div>
    </section>
  );
}

export default Home;
