import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="flex justify-center">
          <div className="md:w-[45%] w-full py-4">
            <Link href="/" className="text-xl font-medium">
              Ibnu.dev
            </Link>
          </div>
        </div>
      </nav>
      <main className="py-10">{children}</main>
    </div>
  );
} 