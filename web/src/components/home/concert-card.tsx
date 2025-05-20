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

export default function ConcertCard({
  concert,
  onDelete,
}: {
  concert: Concert;
  onDelete?: (id: string) => void;
}) {
  const handleDelete = async () => {
    try {
      await deleteConcert({ id: concert.id });
      toast({
        title: "Success",
        description: "Concert deleted successfully",
        isError: false,
      });
      if (onDelete) {
        onDelete(concert.id);
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
  return (
    <div className="border rounded-md p-4 space-y-2 shadow-sm w-full">
      <div className="sm:text-2xl md:text-3xl font-semibold text-blue-400 border-b border-gray-200 pb-2">
        {concert.name}
      </div>

      <p className="text-xs sm:text-sm text-gray-700">{concert.description}</p>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm">
          <UsersRound size={16} /> {concert.total_of_seat}
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
                  {concert.name}
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
          <Button></Button>
        )}
      </div>
    </div>
  );
}
