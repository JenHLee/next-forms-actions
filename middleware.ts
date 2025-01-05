import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  // 세션이 없고, 요청 경로가 publicOnlyUrls에 없는 경우
  if (!session.id) {
    if (!exists && request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // 사용자가 로그인한 상태에서 publicOnlyUrls 경로로 접근하면 리다이렉트
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}