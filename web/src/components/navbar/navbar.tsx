"use client";

import {
  ChevronLast,
  ChevronFirst,
  Home,
  Inbox,
  LogOut,
  RefreshCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavbarItem from "./navnat-item";

export default function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const expandedDefault =
      typeof window !== "undefined"
        ? localStorage.getItem("navbarExpanded")
        : "false";
    setExpanded(expandedDefault === "true");
  });
  const pathname = usePathname();
  return (
    <div className="h-full flex-none relative max-w-60 min-w-[86px] bg-white border-r border-gray-200">
      <button
        onClick={() => {
          localStorage.setItem("navbarExpanded", String(!expanded));
          setExpanded((curr) => !curr);
          window.dispatchEvent(new Event("expandNavbar"));
        }}
        type="button"
        className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-100 absolute -right-4 top-14 hover:cursor-pointer text-black"
      >
        {expanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
      <nav
        className={`h-full flex flex-col justify-between overflow-x-hidden transition-all no-scrollbar py-14 ${
          expanded ? "px-10" : "px-4"
        }`}
      >
        <div className="flex flex-col justify-between items-center gap-3.5 px-2">
          <span
            className={` text-xl text-center font-semibold overflow-hidden text-black text-nowrap ${
              expanded ? "w-full" : "w-0"
            }`}
          >
            Admin
            {isAdmin ? <p>(Admin)</p> : null}
          </span>
          <hr className="w-full bg-white my-5" />
        </div>
        <ul className="flex-1 flex gap-2.5 flex-col">
          <NavbarItem
            icon={<Home size={20} />}
            text="Home"
            expanded={expanded}
            active={pathname.startsWith(isAdmin ? "/admin/home" : "/home")}
            href={isAdmin ? "/admin/home" : "/home"}
          />
          <NavbarItem
            icon={<Inbox size={20} />}
            text="History"
            active={pathname.startsWith(
              isAdmin ? "/admin/history" : "/history"
            )}
            href={isAdmin ? "/admin/history" : "/history"}
            expanded={expanded}
          />
          <NavbarItem
            icon={<RefreshCcw size={20} />}
            text="Switch"
            expanded={expanded}
            active={pathname.startsWith(isAdmin ? "/admin/switch" : "/switch")}
            href={isAdmin ? "/admin/switch" : "/switch"}
          />
        </ul>

        <div className="flex flex-col">
          <div className="px-2">
            <hr className="w-full bg-white my-5" />
            <NavbarItem
              icon={<LogOut size={20} />}
              text="Logout"
              active={pathname.startsWith(
                isAdmin ? "/admin/logout" : "/logout"
              )}
              href={isAdmin ? "/admin/logout" : "/logout"}
              expanded={expanded}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
