"use client";
import { ModeToggle } from "@/components/theme-toggle";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import { page_routes } from "@/lib/routes-config";
import { SheetClose } from "@/components/ui/sheet";
import Logo, { DarkLogo } from "./ui/logo";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export const NAVLINKS = [
  {
    title: "Documentation",
    href: `/docs/${page_routes[0].href}`,
  },
];

export const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 lg:px-4 px-2 backdrop-filter backdrop-blur-xl bg-opacity-5">
      <div className="sm:p-5 p-2 container mx-auto h-full flex items-center justify-between gap-2">
        <SheetLeftbar />
        <div className="flex items-center gap-2">
          <div className="md:flex hidden">
            <div className="dark:hidden">
              <Logo />
            </div>
            <div className="hidden dark:block">
              <DarkLogo />
            </div>
          </div>
          <p className="text-gray-800 dark:text-white mx-4 font-semibold">
            Reeducate
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* <Search /> */}
            <div className="flex">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost rounded-btn"
                >
                  <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
                >
                  <li>
                    <button onClick={() => setTheme("light")}>Light</button>
                  </li>
                  <li>
                    <button onClick={() => setTheme("dark")}>Dark</button>
                  </li>
                </ul>
              </div>
              {/* <ModeToggle /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="text-black dark:text-white font-semibold"
            absolute
            href={item.href}
          >
            {item.title}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
