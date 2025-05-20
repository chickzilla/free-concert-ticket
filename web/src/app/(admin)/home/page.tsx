import ConcertTab from "@/components/home/concert-tab";
import Stat from "@/components/home/stat";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen space-y-4 pt-10 bg-[#fbfbfb]">
      <Stat />
      <ConcertTab />
    </div>
  );
}
