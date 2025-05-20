"use client";

import ConcertCard from "@/components/home/concert-card";
import { toast } from "@/components/ui/use-toast";
import { Concert } from "@/interface";
import findAllWithReservationStatus from "@/service/concert/findAllWIthActionStatus";
import { useEffect, useState } from "react";

export default function Home() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await findAllWithReservationStatus();
        setConcerts(res);
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
    fetchConcerts();
    setLoading(false);
  }, []);

  if (loading) {
    return;
  }
  return (
    <div className="flex flex-col items-center min-h-screen pt-10 bg-[#fbfbfb]">
      <div className="space-y-4 w-full ">
        {!loading && (
          <>
            {concerts.length === 0 ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="text-gray-500 text-2xl font-semibold py-10">
                  No concerts found
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {concerts.map((concert) => (
                  <ConcertCard key={concert.id} concert={concert} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
