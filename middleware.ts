import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
    [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
    "/login": true,
    "/create-account": true,
}

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname]

    if(!session.id) {
        if(!exists) {
            return NextResponse.redirect(new URL("/create-account", request.url))
        }
    }else {
            // user logged in =>
            if (exists){
                return NextResponse.redirect(new URL("/", request.url))
            }
        }
    }