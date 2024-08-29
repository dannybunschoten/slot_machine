import Game from "./components/Game";
import { ScoreList } from "./components/ScoreList";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col items-center overflow-x-hidden bg-blue p-4">
      <div className="h-[66.66%] flex-grow"></div>
      <Game>
        <ScoreList />
      </Game>
      <div className="h-[33.33%] flex-grow"></div>
    </div>
  );
}
