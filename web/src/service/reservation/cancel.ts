export default async function cancelConcert(concert_id: string): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservation/cancel`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        concert_id,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
}
