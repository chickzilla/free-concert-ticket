"use client";
import { useEffect, useState } from "react";
import StatItem from "./stat-item";

export default function Stat() {
  const [totalOfSeats, setTotalOfSeats] = useState(500);

  useEffect(() => {
    const fetchData = async () => {
      // TODO api
    };
    fetchData();
  }, []);

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        <StatItem
          title="Total of seats"
          value={totalOfSeats}
          bg="bg-[#0070A4]"
        />
        <StatItem title="Reserve" value={500} bg="bg-[#00A58B]" />
        <StatItem title="Cancel" value={12} bg="bg-[#E84E4E]" />
      </div>
    </div>
  );
}
