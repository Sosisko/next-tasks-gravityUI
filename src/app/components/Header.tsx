"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  return (
    <div className="bg-teal-700 py-4">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <img className="w-24" src="../logo.png" alt="logo" />
        </Link>

        <ul className="flex gap-6 items-center justify-center flex-1">
          <li>
            <Link
              className={
                "text-slate-50 text-2xl" +
                (usePathname() === "/" ? " font-bold shadow-lg" : "")
              }
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={
                "text-slate-50 text-2xl" +
                (usePathname() === "/admin" ? " font-bold shadow-lg" : "")
              }
              href="/admin"
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
