import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routeAccessMap } from "./lib/settings";
import { auth } from "@/lib/auth";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  regex: new RegExp(`^${route.replace('(.*)', '.*')}$`),
  allowedRoles: routeAccessMap[route],
}));

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip Static & API
  if (
      pathname.startsWith("/api") || 
      pathname.startsWith("/_next") ||
      pathname.includes(".")
  ) {
      return NextResponse.next();
  }

  // Public routes
  if (pathname === "/sign-in" || pathname === "/logout") {
      return NextResponse.next();
  }

  // Use the internal Better Auth API directly in the middleware
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });

  const user = sessionData?.user;
  const role = user?.role;

  // Handle Root redirect
  if (pathname === "/") {
    if (user) {
        return NextResponse.redirect(new URL(`/${role || "user"}`, request.url));
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  for (const { regex, allowedRoles } of matchers) {
    if (regex.test(pathname)) {
      if (!user) {
         return NextResponse.redirect(new URL("/sign-in", request.url));
      }
      
      if (!role || !allowedRoles.includes(role)) {
        // Redirect to their own dashboard or root if unauthorized
        const target = role ? `/${role}` : "/sign-in";
        if (pathname !== target) {
            return NextResponse.redirect(new URL(target, request.url));
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
