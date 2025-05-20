"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersRound, Trash2, Save } from "lucide-react";
import ConcertCard from "./concert-card";
import { Concert } from "@/interface";
import findAll from "@/service/concert/findAll";
import { toast } from "../ui/use-toast";
import { ConcertCreateForm } from "./concert-create-form";

export default function ConcertTab() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
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
            <div className="space-y-4">
              {concerts.map((concert) => (
                <ConcertCard key={concert.id} concert={concert} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="create">
          <ConcertCreateForm />
        </TabsContent>
      </div>
    </Tabs>
  );
}
