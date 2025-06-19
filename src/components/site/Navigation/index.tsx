import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  return (
    <div className="p-4 flex items-center justify-between relative">
      {/* Logo */}
      <aside className="flex items-center gap-2">
        <Image
          src="/assets/siteforge-logo.svg"
          width={50}
          height={50}
          alt="siteforge logo"
        />
        <span className="text-xl font-bold">SiteForge</span>
      </aside>

      {/* Center nav */}
      <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ul className="flex items-center gap-8">
          <li><Link href="#">Pricing</Link></li>
          <li><Link href="#">About</Link></li>
          <li><Link href="#">Docs</Link></li>
          <li><Link href="#">Features</Link></li>
        </ul>
      </nav>

      {/* Right section (optional: user/avatar) */}
      <aside className="hidden md:flex md:items-center gap-2">
        <Link href="/agency/sign-in" className="text-sm hover:underline">
         <Button>
             Sign In
         </Button>
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
