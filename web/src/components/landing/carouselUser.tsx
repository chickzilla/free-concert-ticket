import { User, UserCog } from "lucide-react";

export default function CarouselUser({
  name,
  bgColor,
  isAdmin,
}: {
  name: string;
  bgColor: string;
  isAdmin?: boolean;
}) {
  return (
    <>
      <div
        className={`w-full h-[200px] ${bgColor} rounded-lg shadow-md opacity-80 flex items-center justify-center transition-all duration-300 scale-90 hover:scale-100 hover:cursor-pointer`}
      >
        {isAdmin ? (
          <UserCog className="text-black w-full h-full" />
        ) : (
          <User className="text-black w-full h-full" />
        )}
      </div>
      <div className="font-bold text-2xl mt-3">{name}</div>
    </>
  );
}
