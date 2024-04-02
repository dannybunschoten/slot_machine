import SlotMachine from "@/components/SlotMachine";
import BarHolder from "@/components/BarHolder";
import RollButton from "@/components/RollButton";

export default function Home() {
  return (
    <div className="flex flex-row  h-screen items-center bg-gray-800">
      <div className="flex flex-col w-screen items-center">
        <BarHolder className="max-h-10" />
        <RollButton />
      </div>
    </div>
    // <SlotMachine />
  );
}
