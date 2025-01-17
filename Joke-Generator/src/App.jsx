import { useEffect, useState, useTransition } from "react";
import { api } from "./axios";

export const App = () => {
    
    const [joke, setJoke] = useState(null);
    const [attempt, setAttempt] = useState(() => parseInt(localStorage.getItem("attempts")) || 1);
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const { data, status } = await api.get("/Any");
                if (status === 200) {
                    const attempts = localStorage.getItem("attempts") || 1;
                    localStorage.setItem("attempts", parseInt(attempts) + 1);
                    setJoke(data);
                    setPending(false);
                }
            }catch (error) {
                console.error(error);
            }
        })()
    }, [attempt]);

    return <div className="bg-white shadow-md rounded px-8 py-6">
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-bold mb-4">Joke Generator</h2>
                {
                    !isPending && joke && <div className="flex flex-col bg-gray-100 p-4 rounded h-52 w-full md:w-96 overflow-y-auto">
                        {
                            joke?.setup && <div className="space-y-2 mb-4">
                                <div className="font-bold">{joke.setup}</div>
                                <div>{joke.delivery}</div>
                            </div>
                        }
                        {
                            joke?.joke && <div className="space-y-2 mb-4">
                                <div>{joke.joke}</div>
                            </div>
                        }
                    </div>
                }
                {
                    isPending && <div className="flex items-center justify-center h-52">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                }
                <div>Generated: {attempt} Jokes</div>
                <button className="bg-green-500 px-4 py-2 rounded text-white" onClick={() => !isPending && setAttempt((attempt) => attempt + 1)}>Generate</button>
            </div>
    </div>
}
