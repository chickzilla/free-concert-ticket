"use client";
import { useEffect, useState } from "react";
import StatItem from "./stat-item";
import allTotalOfSeat from "@/service/concert/allTotalOfSeat";
import { toast } from "@/components/ui/use-toast";

export default function Stat({
  totalOfSeats,
  reserveCount,
  cancelCount,
}: {
  totalOfSeats: number;
  reserveCount: number;
  cancelCount: number;
}) {
  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatItem
          title="Total of seats"
          value={totalOfSeats}
          bg="bg-[#0070A4]"
        />
        <StatItem title="Reserve" value={reserveCount} bg="bg-[#00A58B]" />
        <StatItem title="Cancel" value={cancelCount} bg="bg-[#E84E4E]" />
      </div>
    </div>
  );
}
