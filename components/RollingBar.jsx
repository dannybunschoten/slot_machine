const symbols = ["🍒", "🍋", "🍊", "🔔", "⭐", "💎"];

export default function RollingBar() {
    return (
        <div className="flex flex-row flex-wrap overflow-x-auto">
            {[1, 2].map((iteration, iterationIndex) => {
                return symbols.map((symbol, index) => (
                    <p key={`${iterationIndex}-${index}`} className="text-7xl">{symbol}</p>
                ));
            })}
        </div>
    );
}
