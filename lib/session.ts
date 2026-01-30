import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionData {
  id?: number;
}

export default async function getSession() {
  return getIronSession<SessionData>(await cookies(), {
    cookieName: "carrot-info",
    password: process.env.COOKIE_PASSWORD as string,
  });
}
