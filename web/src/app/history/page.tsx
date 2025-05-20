"use client";

import HistoryTable from "@/components/history/history-table";
import { toast } from "@/components/ui/use-toast";
import { ReservationAction } from "@/const";
import { Histories } from "@/interface/history";
import viewAllHistories from "@/service/reservation/viewAllHistories";
import viewHistoriesByUserId from "@/service/reservation/viewHistoriesByUserId";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<Histories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await viewHistoriesByUserId();
        setHistory(res);
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
    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return;
  }
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-10 text-black bg-[#fbfbfb] overflow-x-hidden">
      <div className="w-full max-w-4xl overflow-x-auto bg-[#fbfbfb]">
        <HistoryTable history={history} />
      </div>
    </div>
  );
}
