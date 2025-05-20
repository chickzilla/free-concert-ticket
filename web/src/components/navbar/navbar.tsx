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
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("navbarExpanded");

    const isMobile = window.innerWidth < 680;
    if (isMobile) {
      setExpanded(false);
      return;
    }
    if (stored === null) {
      setExpanded(!isMobile);
    } else {
      setExpanded(stored === "true");
    }
  }, []);

  const toggleExpand = () => {
    localStorage.setItem("navbarExpanded", String(!expanded));
    setExpanded(!expanded);
    window.dispatchEvent(new Event("expandNavbar"));
  };

  return (
    <div className="h-full flex-none relative max-w-60 min-w-[86px] bg-white border-r border-gray-200">
      <button
        onClick={toggleExpand}
        type="button"
        className="hidden sm:block p-1.5 rounded-lg bg-gray-200 hover:bg-gray-100 absolute -right-4 top-14 hover:cursor-pointer text-black"
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
            className={`text-xl text-center font-semibold overflow-hidden text-black text-nowrap transition-all ${
              expanded ? "w-full" : "w-0"
            }`}
          >
            Admin
            {isAdmin && <p>(Admin)</p>}
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
            expanded={expanded}
            active={pathname.startsWith(
              isAdmin ? "/admin/history" : "/history"
            )}
            href={isAdmin ? "/admin/history" : "/history"}
          />
          <NavbarItem
            icon={<RefreshCcw size={20} />}
            text="Switch"
            expanded={expanded}
            active={pathname.startsWith("/admin/switch")}
            href="/admin/switch"
          />
        </ul>

        <div className="flex flex-col px-2">
          <hr className="w-full bg-white my-5" />
          <NavbarItem
            icon={<LogOut size={20} />}
            text="Logout"
            expanded={expanded}
            active={pathname.startsWith("/admin/logout")}
            href="/admin/logout"
          />
        </div>
      </nav>
    </div>
  );
}
