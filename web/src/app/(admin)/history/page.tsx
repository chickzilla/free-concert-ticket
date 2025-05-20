"use client";

import { ReservationAction } from "@/const";
import { Histories } from "@/interface/history";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<Histories[]>([]);

  useEffect(() => {
    // Using mock data
    const mockData: Histories[] = [
      {
        id: "1",
        date: "12/09/2024 15:00:00",
        username: "Sara JohnSara JohnSara JohnSara JohnSara JohnSara John",
        concert_name:
          "The festival Int 2024The festival Int 2024The festival Int 2024The festival Int 2024",
        action: ReservationAction.RESERVE,
      },
      {
        id: "2",
        date: "12/09/2024 10:39:20",
        username: "Sara John",
        concert_name: "The festival Int 2024",
        action: ReservationAction.CANCEL,
      },
    ];

    setHistory(mockData);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-10 text-black bg-[#fbfbfb] overflow-x-hidden">
      <div className="w-full max-w-4xl overflow-x-auto bg-[#fbfbfb]">
        <table className="min-w-full table-auto border border-gray-300 text-xs sm:text-sm">
          <thead>
            <tr className="text-left bg-[#fbfbfb]">
              <th className="border px-2 sm:px-4 py-2">Date time</th>
              <th className="border px-2 sm:px-4 py-2">Username</th>
              <th className="border px-2 sm:px-4 py-2">Concert name</th>
              <th className="border px-2 sm:px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td
                  className="border px-2 sm:px-4 py-1 max-w-[160px] truncate"
                  title={item.date}
                >
                  {item.date}
                </td>
                <td
                  className="border px-2 sm:px-4 py-1 max-w-[160px] truncate"
                  title={item.username}
                >
                  {item.username}
                </td>
                <td
                  className="border px-2 sm:px-4 py-1 max-w-[180px] truncate"
                  title={item.concert_name}
                >
                  {item.concert_name}
                </td>
                <td className="border px-2 sm:px-4 py-1">{item.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
