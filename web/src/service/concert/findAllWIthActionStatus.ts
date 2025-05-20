export default async function findAllWithReservationStatus() {
  // TODO change to real
  const mockUserId = "524d47f7-2659-483a-adfc-14ed353f3095";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/concert/findAllWithReservationStatus/${mockUserId}`,
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
