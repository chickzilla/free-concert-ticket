export default async function cancelConcert(concert_id: string): Promise<void> {
  // TODO change to real
  const mockUserId = "524d47f7-2659-483a-adfc-14ed353f3095";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservation/cancel`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: mockUserId,
        concert_id,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
}
