import Link from "next/link";
import { ReactNode } from "react";

interface ContactLinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function ContactLink({ href, icon, children }: ContactLinkProps) {
  return (
    <li className=" text-gray-600 dark:text-gray-400">
      <div className="flex items-center gap-3">
      <span className="text-gray-500 dark:text-gray-400">{icon}</span>
      <Link
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </Link>
      </div>
    
    </li>
  );
} 