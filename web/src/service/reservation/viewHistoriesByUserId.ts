import { Histories } from "@/interface";

export default async function viewHistoriesByUserId(): Promise<Histories[]> {
  // TODO change to real
  const mockUserId = "a6ce088e-4da7-47a9-a44b-c3c92b81ec05";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservation/viewHistories/${mockUserId}`,
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
