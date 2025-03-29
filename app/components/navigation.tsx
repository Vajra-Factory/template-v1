"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Vajrakama
            </span>
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other controls here */}
          </div>
          <nav className="flex items-center space-x-2">
            {session ? (
              <Link href="/dashboard">
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <span className="sr-only">Dashboard</span>
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <span className="sr-only">Sign in</span>
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="relative h-8 w-8 rounded-full">
                    <span className="sr-only">Sign up</span>
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const { data: session } = useSession();
  
  return (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
      <div className="flex flex-col space-y-3">
        <Link
          href="/"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          )}
        >
          Home
        </Link>
        {session && (
          <>
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              )}
            >
              Settings
            </Link>
          </>
        )}
        {!session && (
          <>
            <Link
              href="/sign-in"
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              )}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              )}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </ScrollArea>
  );
} 