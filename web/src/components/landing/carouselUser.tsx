"use client";
import login from "@/service/auth/login";
import { User, UserCog } from "lucide-react";
import { toast } from "../ui/use-toast";

export default function CarouselUser({
  name,
  bgColor,
  isAdmin,
}: {
  name: string;
  bgColor: string;
  isAdmin?: boolean;
}) {
  const loginHandler = async () => {
    try {
      await login(name);

      toast({
        title: "Success",
        description: `Logged in as ${name}`,
        isError: false,
      });
      window.location.href = "/home";
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
  return (
    <>
      <div
        className={`w-full h-[200px] ${bgColor} rounded-lg shadow-md opacity-80 flex items-center justify-center transition-all duration-300 scale-90 hover:scale-100 hover:cursor-pointer`}
        onClick={loginHandler}
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
