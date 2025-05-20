import { allTotalOfSeatResponse, Concert } from "@/interface";

export default async function findAll(): Promise<Concert[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/concert/findAll`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return await res.json();
}
