// src/components/Tamagotchi.jsx
import { useState, useEffect } from "react";

export function Tamagotchi() {
    const [hunger, setHunger] = useState(50);
    const [happiness, setHappiness] = useState(50);
    const [health, setHealth] = useState(100);

    const feed = () => {
        setHunger((prev) => Math.min(prev + 20, 100));
        setHealth((prev) => Math.min(prev + 5, 100));
    };

    const play = () => {
        setHappiness((prev) => Math.min(prev + 20, 100));
        setHunger((prev) => Math.max(prev - 5, 0));
        setHealth((prev) => Math.max(prev - 5, 0));
    };

    const sleep = () => {
        setHealth((prev) => Math.min(prev + 10, 100));
        setHappiness((prev) => Math.max(prev - 5, 0));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setHunger((prev) => Math.max(prev - 1, 0));
            setHappiness((prev) => Math.max(prev - 1, 0));
            setHealth((prev) => Math.max(prev - 1, 0));
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const getProgressColor = (value) => {
        if (value > 60) return "bg-green-500";
        if (value > 20) return "bg-yellow-500";
        return "bg-red-500";
    };

    const getStatusMessage = () => {
        if (hunger < 20) return "¡Tengo hambre! 😟😟";
        if (happiness < 20) return "Estoy triste 😢😢";
        if (health < 20) return "No me siento bien 😷😷";
        return "¡Estoy feliz! 😊😊";
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-80">
            <h1 className="text-2xl font-bold text-center mb-4">
                🐱Tamagotchi🐱
            </h1>
            <p className="text-center text-lg font-semibold mb-4">
                {getStatusMessage()}
            </p>

            <div className="mb-4">
                <label className="block font-medium mb-1">Hambre:</label>
                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                    <div
                        className={`${getProgressColor(hunger)} h-full`}
                        style={{ width: `${hunger}%` }}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Felicidad:</label>
                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                    <div
                        className={`${getProgressColor(happiness)} h-full`}
                        style={{ width: `${happiness}%` }}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Salud:</label>
                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                    <div
                        className={`${getProgressColor(health)} h-full`}
                        style={{ width: `${health}%` }}
                    />
                </div>
            </div>

            <div className="flex space-x-2 mt-4">
                <button
                    onClick={feed}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Feed
                </button>
                <button
                    onClick={play}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    Play
                </button>
                <button
                    onClick={sleep}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                >
                    Sleep
                </button>
            </div>
        </div>
    );
}
