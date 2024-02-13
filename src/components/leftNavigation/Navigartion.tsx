import Link from "next/link";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./accountBtn/AccountBtn"), {
  ssr: false,
});

function NavigationBar() {
  return (
    <section>
      <nav className="flex h-[4.4rem] items-center justify-around border border-b-2 border-l-0 border-r-0 border-t-0 border-slate-300 text-xl font-light">
        <div>
          <Link href="/">Home</Link>
        </div>

        <div className="flex w-72 justify-between">
          <ul>
            <Link href="/products">All Products</Link>
          </ul>
          <ul>
            <Link href="/add_product">Add Product</Link>
          </ul>
        </div>

        <div className="flex h-full min-w-60 items-center justify-between">
          <NoSSR />
        </div>
      </nav>
    </section>
  );
}

export default NavigationBar;
