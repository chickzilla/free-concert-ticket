import { UsersRound } from "lucide-react";

export default function StatItem({
  title,
  value,
  bg,
}: {
  title: string;
  value: number;
  bg: string;
}) {
  return (
    <div
      className={`${bg} text-white rounded p-4 shadow-md text-center py-5 space-y-3`}
    >
      <div>
        <div className="text-xl sm:text-2xl flex justify-center items-center">
          <UsersRound size={20} className="text-white" />
        </div>
        <div className="text-xs sm:text-sm md:text-base">{title}</div>
      </div>
      <div className="mt-1 text-2xl sm:text-3xl md:text-4xl">{value}</div>
    </div>
  );
}
