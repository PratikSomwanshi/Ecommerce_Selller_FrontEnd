"use client";
import React from "react";
import Link from "next/link";

function Access() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-2xl">
      <div>
        <h1>
          Please{" "}
          {
            <Link
              href="/accounts/register"
              className="text-blue-500 underline underline-offset-2"
            >
              register
            </Link>
          }{" "}
          or{" "}
          {
            <Link
              href="/accounts/login"
              className="text-blue-500 underline underline-offset-2"
            >
              login
            </Link>
          }
        </h1>
        <h1>to view your sells</h1>
      </div>
    </div>
  );
}

export default Access;
