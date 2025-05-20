import { Concert } from "@/interface";
import { UsersRound } from "lucide-react";

export default function ConcertCard({ concert }: { concert: Concert }) {
  return (
    <div key={concert.id} className="border rounded-md p-4 space-y-2 shadow-sm">
      <div className="text-base sm:text-lg font-semibold text-blue-600">
        {concert.name}
      </div>

      <p className="text-xs sm:text-sm text-gray-700">{concert.description}</p>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm">
          <UsersRound size={16} /> {concert.total_of_seat}
        </div>
      </div>
    </div>
  );
}
