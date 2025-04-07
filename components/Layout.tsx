import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-yellow-50">
      <nav className=" bg-black text-white ">
        <div className="flex justify-center">
          <div className="md:w-[50%] w-full py-5  flex justify-between items-center px-5 md:px-0">
            <Link href="/" className="text-xl font-medium">
              Ibnu.dev
            </Link>
            <div className="flex gap-6">
              {/* <Link href="/" className="">
                Blog
              </Link> */}

              <Link href="/about" className="">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="px-2 py-2 md:px-0 md:py-8">{children}</main>
    </div>
  );
}
