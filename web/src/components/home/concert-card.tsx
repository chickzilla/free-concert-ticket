"use client";

import { Concert } from "@/interface";
import { UsersRound, Trash2, XCircle } from "lucide-react";
import { MdCancel } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteConcert from "@/service/concert/delete";
import { toast } from "../ui/use-toast";
import reserveConcert from "@/service/concert/reserve";
import { useState } from "react";
import { ReservationAction } from "@/const";

export default function ConcertCard({
  concert,
  onDelete,
}: {
  concert: Concert;
  onDelete?: (id: string) => void;
}) {
  const [childConcert, setChildConcert] = useState<Concert>(concert);

  const handleDelete = async () => {
    try {
      await deleteConcert({ id: concert.id });
      toast({
        title: "Success",
        description: "Concert deleted successfully",
        isError: false,
      });
      if (onDelete) {
        onDelete(childConcert.id);
      }
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

  const handleReserve = async () => {
    if (concert.isReserve) {
      toast({
        title: "Error",
        description: "Concert already reserved",
        isError: true,
      });
      return;
    }

    try {
      await reserveConcert(concert.id);
      setChildConcert((prev) => ({
        ...prev,
        isReserve: true,
      }));
      toast({
        title: "Success",
        description: "Concert reserved successfully",
        isError: false,
      });
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
    <div className="border rounded-md p-4 space-y-2 border-gray-300 w-full">
      <div className="sm:text-2xl md:text-3xl font-semibold text-blue-500 border-b border-gray-300 pb-2">
        {childConcert.name}
      </div>

      <p className="text-xs sm:text-sm text-gray-700">
        {childConcert.description}
      </p>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm">
          <UsersRound size={16} /> {childConcert.total_of_seat}
        </div>

        {onDelete ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="hover:cursor-pointer px-2 py-1 text-[10px] sm:text-xs sm:px-3 sm:py-2 bg-red-500 hover:bg-red-600 text-white flex items-center gap-1"
              >
                <Trash2 size={12} className="sm:size-[14px]" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="text-center">
              <div className="flex justify-center">
                <MdCancel className="text-red-500" size={40} />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base sm:text-lg font-semibold text-center text-black">
                  Are you sure to delete?
                </AlertDialogTitle>
                <AlertDialogDescription
                  className="text-base sm:text-lg font-semibold text-center text-black
             truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px] mx-auto"
                >
                  &quot;
                  {childConcert.name}
                  &quot;
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex justify-center mt-4 w-full">
                <AlertDialogCancel className="px-4 hover:cursor-pointer text-black">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete();
                  }}
                  className="bg-red-500 hover:bg-red-600 hover:cursor-pointer"
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <>
            {childConcert?.isReserve ? (
              <Button
                size="sm"
                className="hover:cursor-pointer px-3 py-1 text-[10px] sm:text-xs sm:px-3 sm:py-2 bg-red-500 text-white flex items-center gap-1 hover:bg-red-700"
              >
                Cancel
              </Button>
            ) : (
              <Button
                size="sm"
                className="hover:cursor-pointer px-3 py-1 text-[10px] sm:text-xs sm:px-3 sm:py-2 bg-blue-500 text-white flex items-center gap-1 hover:bg-blue-700"
                onClick={handleReserve}
              >
                Reserve
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
