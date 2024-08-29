import Game from "./components/Game";
import { HighScoreBoard } from "./components/HighScoreBoard";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col items-center overflow-x-hidden bg-blue p-4">
      <div className="h-[66.66%] flex-grow"></div>
      <Game>
        <HighScoreBoard />
      </Game>
      <div className="h-[33.33%] flex-grow"></div>
    </div>
  );
}
