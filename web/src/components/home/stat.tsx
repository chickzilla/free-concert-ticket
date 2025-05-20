"use client";
import { useEffect, useState } from "react";
import StatItem from "./stat-item";
import allTotalOfSeat from "@/service/concert/allTotalOfSeat";

export default function Stat() {
  const [totalOfSeats, setTotalOfSeats] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalOfSeats = await allTotalOfSeat();
        setTotalOfSeats(totalOfSeats?.total_of_seat);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          alert("Error fetching data: " + error.message);
        }
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return;
  }
  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        <StatItem
          title="Total of seats"
          value={totalOfSeats}
          bg="bg-[#0070A4]"
        />
        <StatItem title="Reserve" value={0} bg="bg-[#00A58B]" />
        <StatItem title="Cancel" value={0} bg="bg-[#E84E4E]" />
      </div>
    </div>
  );
}
