import React, { useState, useEffect } from 'react';

export function Tamagotchi() {
    const [hunger, setHunger] = useState(100);
    const [happiness, setHappiness] = useState(100);
    const [health, setHealth] = useState(100);
    const [hygiene, setHygiene] = useState(100);
    const [energy, setEnergy] = useState(100);
    const [level, setLevel] = useState(1);
    const [levelPoints, setLevelPoints] = useState(0);
    const [shopPoints, setShopPoints] = useState(0);
    const [inventory, setInventory] = useState({
        food: 0,
        toy: 0,
        toothbrush: 0,
        energyDrink: 0
    });
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (levelPoints >= 10) {
            setLevel(currentLevel => currentLevel + 1);
            setLevelPoints(0);
            setShopPoints(currentPoints => currentPoints + 50);
        }
        const savedState = localStorage.getItem('tamagotchiState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setHunger(parsedState.hunger);
            setHappiness(parsedState.happiness);
            setHealth(parsedState.health);
            setHygiene(parsedState.hygiene);
            setEnergy(parsedState.energy);
            setLevel(parsedState.level);
            setLevelPoints(parsedState.levelPoints);
            setShopPoints(parsedState.shopPoints);
            setInventory(parsedState.inventory);
        }

        const timer = setInterval(() => {
            setHunger((prev) => Math.max(prev - (1 + level * 0.1), 0));
            setHappiness((prev) => Math.max(prev - (1 + level * 0.1), 0));
            setHealth((prev) => Math.max(prev - (1 + level * 0.1), 0));
            setHygiene((prev) => Math.max(prev - (1 + level * 0.1), 0));
            setEnergy((prev) => Math.max(prev - (1 + level * 0.1), 0));
            setLevelPoints((prev)=>Math.min(prev + 1, 100))
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (levelPoints >= 10) {
            setLevel(currentLevel => currentLevel + 1);
            setLevelPoints(0);
            setShopPoints(currentPoints => currentPoints + 50);
        }
    }, [hunger, happiness, health, hygiene, energy, level, levelPoints, shopPoints, inventory]);

    useEffect(() => {
        if (hunger === 0 || happiness === 0 || health === 0 || energy === 0) {
            setGameOver(true);
        }
    }, [hunger, happiness, health, energy]);

    useEffect(() => {
        localStorage.setItem('tamagotchiState', JSON.stringify({
            hunger, happiness, health, hygiene, energy, level, levelPoints, shopPoints, inventory
        }));
    }, [hunger, happiness, health, hygiene, energy, level, levelPoints, shopPoints, inventory]);

    const feed = () => {
        setHunger((prev) => Math.min(prev + 20, 100));
        setHealth((prev) => Math.min(prev + 5, 100));
    };

    const play = () => {
        setHappiness((prev) => Math.min(prev + 20, 100));
        setHunger((prev) => Math.max(prev - 5, 0));
    };

    const sleep = () => {
        setEnergy((prev) => Math.min(prev + 10, 100));
        setHappiness((prev) => Math.max(prev - 5, 0));
        setHealth((prev) => Math.min(prev + 2, 100));
    };

    const clean = () => {
        setHygiene((prev) => Math.min(prev + 20, 100));
        setHappiness((prev) => Math.max(prev - 2, 0));
    };

    const rest = () => {
        setEnergy((prev) => Math.min(prev + 20, 100));
        setHealth((prev) => Math.min(prev + 5, 100));
        setHygiene((prev) => Math.max(prev - 10, 0));
    };

    const useItem = (item) => {
        if (inventory[item] > 0) {
            setInventory((prev) => ({ ...prev, [item]: prev[item] - 1 }));
            switch (item) {
                case 'food':
                    setHunger(100);
                    break;
                case 'toy':
                    setHappiness(100);
                    break;
                case 'toothbrush':
                    setHygiene(100);
                    break;
                case 'energyDrink':
                    setEnergy(100);
                    break;
            }
        }
    };

    const buyItem = (item) => {
        if (shopPoints >= 30) {
            setShopPoints((prev) => prev - 30);
            setInventory((prev) => ({ ...prev, [item]: prev[item] + 1 }));
        }
    };

    const resetGame = () => {
        setHunger(100);
        setHappiness(100);
        setHealth(100);
        setHygiene(100);
        setEnergy(100);
        setLevel(1);
        setLevelPoints(0);
        setShopPoints(0);
        setInventory({ food: 0, toy: 0, toothbrush: 0, energyDrink: 0 });
        setGameOver(false);
    };

    const getProgressColor = (value) => {
        if (value > 40) return "bg-green-500";
        if (value > 20) return "bg-yellow-500";
        return "bg-red-500";
    };

    const getStatusMessage = () => {
        if (hunger < 30) return "¡Tengo hambre!";
        if (happiness < 20) return "Estoy triste";
        if (health < 30) return "No me siento bien";
        if (hygiene < 20) return "Me siento sucio";
        if (energy < 40) return "Estoy cansado";
        return "¡Estoy feliz!";
    };

    if (gameOver) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-8 bg-[#22201F] flex flex-col items-center justify-center text-white rounded-lg shadow-md w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-4">Game Over</h2>
                    <img src="rip.jpg" alt="rip" className='w-full'/>
                    <button onClick={resetGame} className="mt-4 px-4 py-2 bg-[#FB4546] text-white rounded hover:scale-110 transition">
                        RESTART
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-4xl">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="md:w-1/2 pr-4">
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Nivel: {level}</label>
                            <label className="block font-medium mb-1">Puntos de Nivel: {levelPoints}</label>
                            <label className="block font-medium mb-1">Puntos de Tienda: {shopPoints}</label>
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium mb-1">Hambre:</label>
                            <div className="bg-gray-300 h-4 rounded overflow-hidden">
                                <div className={`${getProgressColor(hunger)} h-full`} style={{ width: `${hunger}%` }} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium mb-1">Felicidad:</label>
                            <div className="bg-gray-300 h-4 rounded overflow-hidden">
                                <div className={`${getProgressColor(happiness)} h-full`} style={{ width: `${happiness}%` }} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium mb-1">Higiene:</label>
                            <div className="bg-gray-300 h-4 rounded overflow-hidden">
                                <div className={`${getProgressColor(hygiene)} h-full`} style={{ width: `${hygiene}%` }} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium mb-1">Energía:</label>
                            <div className="bg-gray-300 h-4 rounded overflow-hidden">
                                <div className={`${getProgressColor(energy)} h-full`} style={{ width: `${energy}%` }} />
                            </div>
                        </div>

                        <div className="mt-4">           
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Vida:</label>
                                <div className="bg-gray-300 h-4 rounded overflow-hidden">
                                    <div className={`${getProgressColor(health)} h-full`} style={{ width: `${health}%` }} />
                                </div>
                            </div>                            
                        </div>

                        <div className="flex flex-row items-center justify-center gap-4 mt-4">
                            <button onClick={feed} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                Feed
                            </button>
                            <button onClick={play} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                                Play
                            </button>
                            <button onClick={sleep} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
                                Sleep
                            </button>
                            <button onClick={clean} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                                Clean
                            </button>
                            <button onClick={rest} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition">
                                Rest
                            </button>
                        </div>
                        
                    </div>

                    <div className="md:w-1/2 pl-4 mt-4 md:mt-0">
                        <img src="tamagotchi3.gif" alt="Tamagotchi" className="w-full mb-4"/>
                        <p className="text-center text-lg font-semibold mb-4">
                            {getStatusMessage()}
                        </p>      
                    </div>                    
                </div>               
            </div>
            <h3 className="font-bold mb-2 text-center text-white" >Inventario:</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button onClick={() => useItem('food')} className="px-2 py-1 bg-[#F5F5F5] text-black rounded hover:scale-110 transition">
                            <img src="ramen.jpg" alt="ramen" width={90}/> ({inventory.food})
                        </button>
                        <button onClick={() => useItem('toy')} className="px-2 py-1 bg-[#F5F5F5] text-black rounded hover:scale-110 transition">
                            <img src="play2.png" alt="play" width={90}/> ({inventory.toy})
                        </button>
                        <button onClick={() => useItem('toothbrush')} className="px-2 py-1 bg-[#F5F5F5] text-black rounded hover:scale-110 transition">
                            <img src="sponge2.png" alt="sponge" width={90}/> ({inventory.toothbrush})
                        </button>
                        <button onClick={() => useItem('energyDrink')} className="px-2 py-1 bg-[#F5F5F5] text-black rounded hover:scale-110 transition">
                            <img src="coffee3.png" alt="coffee" width={90}/> ({inventory.energyDrink})
                        </button>
                    </div>
            <div className="mt-8 w-full max-w-4xl">
            <h3 className="font-bold mb-2 text-center text-[#FFFFFF]">Tienda:</h3>
                <div className="flex flex-wrap justify-center gap-2">
                    <button onClick={() => buyItem('food')} className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                        Ramen (30 pts)
                    </button>
                    <button onClick={() => buyItem('toy')} className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                        Juegos (30 pts)
                    </button>
                    <button onClick={() => buyItem('toothbrush')} className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                        Jabon (30 pts)
                    </button>
                    <button onClick={() => buyItem('energyDrink')} className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                        Café (30 pts)
                    </button>
                </div>
            </div>
        </div>
    );
}