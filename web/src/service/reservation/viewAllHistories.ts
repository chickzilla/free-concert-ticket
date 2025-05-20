import { Histories } from "@/interface/history";

export default async function viewAllHistories(): Promise<Histories[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservation/viewHistories`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return await res.json();
}
