export default async function deleteConcert({
  id,
}: {
  id: string;
}): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/concert/delete/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
}
