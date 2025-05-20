"use server";

import { cookies } from "next/headers";

export default async function logout() {
  const cookieStore = await cookies();

  (await cookies()).delete("token");
  (await cookies()).delete("role");
}
