export default async function findAllWithReservationStatus() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/concert/findAllWithReservationStatus`,
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
