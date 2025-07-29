"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "motion/react";
import { supabase } from "@/lib/supabase-browser";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    }
    getUser();
  }, []);

  const menuItems = [
    { name: "Features", href: "/#Features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    ...(user ? [{ name: "Saved Pitches", href: "/saved-pitches" }] : []),
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          "fixed left-1/2 -translate-x-1/2 lg:mt-2 z-20 w-full max-w-5xl lg:rounded-full rounded-md transition-colors duration-150",
          scrolled && "bg-background/50 backdrop-blur-3xl"
        )}
      >
        <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <h1 className="text-xl font-bold">📜 PitchCraft</h1>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>
            <div className="hidden lg:block">
              <ul className="flex gap-8 text-sm">
                <NavigationMenu className="hidden lg:block">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent px-4 py-3 min-w-[40px] min-h-[40px]">
                        Getting started
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-1 p-4 md:w-[400px] lg:w-[500px]">
                          <li className="row">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-bl from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/pitch"
                              >
                                📜
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  PitchCraft
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Not just pitches. Talk Like King to Investors!
                                  👑
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Button variant="ghost" asChild>
                      <Link
                        href={item.href}
                        className="text-black hover:text-accent-foreground block duration-150"
                        aria-label="Link"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent text-center">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Button variant="ghost" asChild className="font-sans">
                        <Link
                          href={item.href}
                          className=" text-muted-foreground hover:text-accent-foreground block duration-150"
                          aria-label="Link"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      {user.user_metadata?.name || user.email}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="h-8 w-8 cursor-pointer">
                          <AvatarImage
                            src={user.user_metadata?.avatar_url || ""}
                          />
                          <AvatarFallback>
                            {user.user_metadata?.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="w-full">
                            Manage Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            await supabase.auth.signOut();
                            window.location.reload();
                          }}
                          className="text-red-500"
                        >
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/auth/login">
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="font-sans">
                      <Link href="/auth/signup">
                        <span>Sign Up - It's Free</span>
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
