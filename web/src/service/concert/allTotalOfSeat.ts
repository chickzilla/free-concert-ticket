import { allTotalOfSeatResponse } from "@/interface";

export default async function allTotalOfSeat(): Promise<allTotalOfSeatResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/concert/totalOfSeat`,
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
