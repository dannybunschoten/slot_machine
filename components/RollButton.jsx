export default function RollButton({ onClick }) {
    return (
        <div className="flex justify-center items-center mt-4">
            <button
                onClick={onClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-36 rounded focus:outline-none focus:shadow-outline text-5xl"
            >
                Roll
            </button>
        </div>
    );
}