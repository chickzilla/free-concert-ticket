import { Histories } from "@/interface";

export default async function viewHistoriesByUserId(): Promise<Histories[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservation/viewHistoriesByUserId`,
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
