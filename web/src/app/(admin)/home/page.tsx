"use client";

import { useEffect, useState } from "react";
import ConcertTab from "@/components/home/concert-tab";
import Stat from "@/components/home/stat";
import allTotalOfSeat from "@/service/concert/allTotalOfSeat";

export default function Home() {
  const [totalOfSeats, setTotalOfSeats] = useState(0);

  const fetchTotalSeats = async () => {
    try {
      const result = await allTotalOfSeat();
      setTotalOfSeats(result?.total_of_seat || 0);
    } catch (error) {
      console.error("Failed to fetch total_of_seat", error);
    }
  };

  useEffect(() => {
    fetchTotalSeats();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen space-y-4 pt-10 bg-[#fbfbfb]">
      <Stat totalOfSeats={totalOfSeats} />
      <ConcertTab onConcertChanged={fetchTotalSeats} />
    </div>
  );
}
