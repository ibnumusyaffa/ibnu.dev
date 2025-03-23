import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen ">
      <nav className=" bg-black text-white ">
        <div className="flex justify-center">
          <div className="md:w-[50%] w-full py-5  flex justify-between items-center">
            <Link href="/" className="text-xl font-medium transition-colors">
              Ibnu.dev
            </Link>
            <div className="flex gap-6">
              <Link href="/about" className=" transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10 bg-yellow-50">{children}</main>
    </div>
  );
} 