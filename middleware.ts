import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();

  //Check if user request one of the public routes or not
  const pbRoute = publicUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!pbRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (pbRoute) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
