import { CountActionResponse } from "@/interface";

export default async function countActions(): Promise<CountActionResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservation/countAction`,
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
