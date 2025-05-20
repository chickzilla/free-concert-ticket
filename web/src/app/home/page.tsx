"use client";

import ConcertCard from "@/components/home/concert-card";
import { Concert } from "@/interface";
import { useEffect, useState } from "react";

export default function Home() {
  const [concerts, setConcerts] = useState<Concert[]>([]);

  useEffect(() => {
    const mockConcerts: Concert[] = [
      {
        id: "1",
        name: "Concert of Dreams",
        description:
          "An amazing live experience with spectacular lights and sound.",
        total_of_seat: 300,
        total_of_reservation: 150,
        created_at: new Date(),
      },
      {
        id: "2",
        name: "Music Night 2024",
        description:
          "Join us for a night of musical magic and unforgettable memories.",
        total_of_seat: 200,
        total_of_reservation: 80,
        created_at: new Date(),
      },
    ];
    setConcerts(mockConcerts);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pt-10 bg-[#fbfbfb]">
      <div className="space-y-4 w-full ">
        {concerts.map((concert) => (
          <ConcertCard key={concert.id} concert={concert} />
        ))}
      </div>
    </div>
  );
}
