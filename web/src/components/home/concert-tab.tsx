"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
/* import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"; */
import { UsersRound, Trash2, Save } from "lucide-react";
import ConcertCard from "./concert-card";
import { Concert } from "@/interface";
import findAll from "@/service/concert/findAll";
import { toast } from "../ui/use-toast";

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

      <div className="relative min-h-[400px] max-h-[400px] overflow-y-auto">
        <TabsContent value="overview">
          {loading && (
            <div className="space-y-4">
              {concerts.map((concert) => (
                <ConcertCard key={concert.id} concert={concert} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="create">
          <div className="border rounded-md p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-blue-600">Create</h2>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
