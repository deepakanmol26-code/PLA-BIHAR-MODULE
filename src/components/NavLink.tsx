"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const NavLink = forwardRef<HTMLAnchorElement, any>(
  ({ className, activeClassName, pendingClassName, to, end, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = end ? pathname === to : pathname.startsWith(to);
    
    // Resolve className if it's a function (from React Router compatibility)
    const resolvedClassName = typeof className === "function" 
      ? className({ isActive, isPending: false }) 
      : cn(className, isActive && activeClassName);

    return (
      <Link
        ref={ref}
        href={to}
        className={resolvedClassName}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
