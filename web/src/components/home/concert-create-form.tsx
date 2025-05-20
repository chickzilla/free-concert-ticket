"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, User } from "lucide-react";
import create from "@/service/concert/create";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Concert name is required" }),
  total_of_seat: z.number().min(1, { message: "Must be at least 1 seat" }),
  description: z.string().min(5, { message: "Description too short" }),
});

type CreateConcertValues = z.infer<typeof formSchema>;

export function ConcertCreateForm() {
  const form = useForm<CreateConcertValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      total_of_seat: 500,
      description: "",
    },
  });

  const onSubmit = (data: CreateConcertValues) => {
    const createConcert = async () => {
      const res = await create({
        name: data.name,
        description: data.description,
        total_of_seat: data.total_of_seat,
      });
    };
    createConcert()
      .then(() => {
        form.reset();
        toast({
          title: "Success",
          description: "Concert created successfully",
          isError: false,
        });
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            isError: true,
          });
        }
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border p-4 sm:p-6 rounded shadow-sm w-full"
      >
        <div className="text-2xl sm:text-4xl font-bold text-blue-400 border-b border-gray-200 pb-2">
          Create
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-base sm:text-lg">
                  Concert Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please input concert name"
                    {...field}
                    className="border-black text-black placeholder:text-gray-400 text-sm sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="total_of_seat"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-base sm:text-lg">
                  Total of seat
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="500"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="border-black text-black placeholder:text-gray-400 pr-10 text-sm sm:text-base"
                    />
                    <User
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black text-base sm:text-lg">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Please input description"
                  {...field}
                  className="border-black text-black placeholder:text-gray-400 text-sm sm:text-base"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-400 text-white hover:bg-blue-700 text-sm sm:text-base hover:cursor-pointer"
          >
            <Save size={16} className="mr-2" />
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
