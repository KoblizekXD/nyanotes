import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Activity, Clock, Gamepad, Plus } from "lucide-react";

export default function HomeWrapper() {
  return (
    <div className="p-8 gap-y-12 md:p-24 flex flex-col">
      <Button className="w-fit absolute right-4 bottom-4">
          <Plus />
          Create new
        </Button>
      <h1 className="text-xl md:text-2xl font-bold">Welcome back, Test</h1>
      <div className="flex flex-col w-full gap-y-4">
        <h2 className="font-semibold flex items-center gap-x-4 md:text-xd text-lg">
          <Clock />
          Recently viewed
        </h2>
        <Separator />
      </div>
      <div className="flex flex-col w-full gap-y-4">
        <h2 className="font-semibold flex items-center gap-x-4 md:text-xd text-lg">
          <Activity />
          Trending
        </h2>
        <Separator />
      </div>
      <div className="flex flex-col w-full gap-y-4">
        <h2 className="font-semibold flex items-center gap-x-4 md:text-xd text-lg">
          <Gamepad />
          Practice
        </h2>
        <Separator />
      </div>
    </div>
  );
}
