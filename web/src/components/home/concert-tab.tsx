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

const mockConcerts: Concert[] = [
  {
    id: "1",
    name: "Concert Name 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.",
    total_of_seat: 500,
    total_of_reservation: 0,
    created_at: new Date(),
  },
  {
    id: "2",
    name: "Concert Name 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a.",
    total_of_seat: 200,
    total_of_reservation: 0,
    created_at: new Date(),
  },
  {
    id: "4",
    name: "Concert Name 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a.",
    total_of_seat: 200,
    total_of_reservation: 0,
    created_at: new Date(),
  },
  {
    id: "3",
    name: "Concert Name 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a.",
    total_of_seat: 200,
    total_of_reservation: 0,
    created_at: new Date(),
  },
];

export default function ConcertTab() {
  const [concerts, setConcerts] = useState(mockConcerts);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="create">Create</TabsTrigger>
      </TabsList>

      <div className="relative min-h-[400px] max-h-[400px] overflow-y-auto">
        <TabsContent value="overview">
          <div className="space-y-4">
            {concerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
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
