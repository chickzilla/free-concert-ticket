"use client";

import { useEffect, useState } from "react";
import ConcertTab from "@/components/home/concert-tab";
import Stat from "@/components/home/stat";
import allTotalOfSeat from "@/service/concert/allTotalOfSeat";
import countActions from "@/service/reservation/countActions";
import { set } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const [totalOfSeats, setTotalOfSeats] = useState(0);
  const [reserveCount, setReserveCount] = useState(0);
  const [cancelCount, setCancelCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTotalSeats = async () => {
    try {
      const result = await allTotalOfSeat();
      setTotalOfSeats(result?.total_of_seat || 0);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          isError: true,
        });
      }
    }
  };

  const fetchReservationAction = async () => {
    try {
      const result = await countActions();
      setReserveCount(result?.reserveCount || 0);
      setCancelCount(result?.cancelCount || 0);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          isError: true,
        });
      }
    }
  };

  useEffect(() => {
    fetchTotalSeats();
    fetchReservationAction();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen space-y-4 pt-10 bg-[#fbfbfb]">
      <Stat
        totalOfSeats={totalOfSeats}
        reserveCount={reserveCount}
        cancelCount={cancelCount}
      />
      <ConcertTab
        onConcertChanged={() => {
          fetchTotalSeats();
          fetchReservationAction();
        }}
      />
    </div>
  );
}
