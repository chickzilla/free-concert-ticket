export default async function create({
  name,
  description,
  total_of_seat,
}: {
  name: string;
  description: string;
  total_of_seat: number;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/concert/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
      total_of_seat: total_of_seat,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
}
