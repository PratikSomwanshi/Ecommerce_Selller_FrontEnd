import Link from "next/link";
import React from "react";

function LinksRegister() {
  return (
    <>
      <Link
        href="/accounts/register"
        className="rounded-full border border-slate-600 px-2 py-1 "
      >
        Register
      </Link>
      <Link
        href="/accounts/login"
        className="rounded-full border border-slate-600 px-2 py-1 "
      >
        Login
      </Link>
    </>
  );
}

export default LinksRegister;
