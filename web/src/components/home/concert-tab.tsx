"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersRound, Trash2, Save, Archive } from "lucide-react";
import ConcertCard from "./concert-card";
import { Concert } from "@/interface";
import findAll from "@/service/concert/findAll";
import { toast } from "../ui/use-toast";
import { ConcertCreateForm } from "./concert-create-form";

export default function ConcertTab({
  onConcertChanged,
}: {
  onConcertChanged: () => void;
}) {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConcerts = async () => {
    try {
      const res = await findAll();
      setConcerts(res);
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

  useEffect(() => {
    fetchConcerts();
    setLoading(false);
  }, []);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="create">Create</TabsTrigger>
      </TabsList>

      <div className="relative min-h-[500px] max-h-[500px] overflow-y-auto">
        <TabsContent value="overview">
          {!loading && (
            <>
              {concerts.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="text-gray-500 text-2xl font-semibold py-10">
                    No concerts found
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {concerts.map((concert) => (
                    <ConcertCard
                      key={concert.id}
                      concert={concert}
                      onDelete={(id: string) => {
                        setConcerts((prev) =>
                          prev.filter((concert) => concert.id !== id)
                        );
                        onConcertChanged();
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="create">
          <ConcertCreateForm
            onCreated={() => {
              fetchConcerts();
              onConcertChanged();
            }}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}
