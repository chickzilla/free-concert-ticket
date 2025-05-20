import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselUser from "./carouselUser";
export default function CarouselUsers() {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent className="w-[200px] sm:w-[250px]">
        <CarouselItem>
          <CarouselUser name="Admin" bgColor="bg-red-400" isAdmin={true} />
        </CarouselItem>
        <CarouselItem>
          <CarouselUser name="User1" bgColor="bg-green-400" />
        </CarouselItem>
        <CarouselItem>
          <CarouselUser name="User2" bgColor="bg-blue-400" />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="text-white bg-black/50 border-0 hover:bg-black/70" />
      <CarouselNext className="text-white bg-black/50 border-0 hover:bg-black/70" />
    </Carousel>
  );
}
