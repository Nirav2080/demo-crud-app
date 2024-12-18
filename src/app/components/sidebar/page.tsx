"use client";
import {
  Building2,
  Goal,
  Home,
  LockIcon,
  LucideIcon,
  Notebook,
  Settings,
  SquareCheckBig,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {

  const sidebarClassName = "fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-0 overflow-y-auto bg-white";
  return (
    <div className={sidebarClassName}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3">
          <div className="text-xl font-bold text-gray-800">Twenty</div>
        </div>
        {/*Team*/}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4">
          <div>
            <h3 className="text-md font-bold tracking-wide">Twenty Team</h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 " />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/*Navbar Links*/}
        <nav className="z-10 w-full">
          <SidebarLink icon={Settings} label="Setting" href="/setting" />
          <div className="px-8 py-5">Workspace</div>
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={User} label="User" href="/user" />
          <SidebarLink icon={Building2} label="Companies" href="/companies" />
          <SidebarLink
            icon={Goal}
            label="Opportunities"
            href="/opportunities"
          />
          <SidebarLink icon={SquareCheckBig} label="Tasks" href="/tasks" />
          <SidebarLink icon={Notebook} label="Notes" href="/notes" />
        </nav>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 ${
          isActive ? "bg-gray-100 text-white" : ""
        }justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6 text-gray-800" />
        <span className={`font-medium text-gray-800`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
