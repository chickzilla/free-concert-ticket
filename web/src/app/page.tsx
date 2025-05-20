import CarouselUsers from "@/components/landing/carouselUsers";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src="/image/landing4.jpg"
        alt="Landing background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute top-6 left-6 z-20 text-white text-3xl font-extrabold tracking-wide">
        Tic-Get
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-white text-center">
        <div className="mb-6">
          <div className=" text-4xl md:text-6xl text-end font-bold ">
            rocking
          </div>
          <div className="text-3xl md:text-5xl font-bold">
            Who's{" "}
            <span className="line-through decoration-black decoration-4">
              watching
            </span>
            ?
          </div>
        </div>

        <CarouselUsers />
      </div>
    </div>
  );
}
