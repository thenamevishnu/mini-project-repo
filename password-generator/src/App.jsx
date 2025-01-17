import { useState } from "react";

export const App = () => {
    const [passwords, setPasswords] = useState(() => {
        const storedPasswords = JSON.parse(localStorage.getItem("passwords"));
        return Array.isArray(storedPasswords) ? storedPasswords : [];
    });

    const [currentPage, setCurrentPage] = useState(1);
    const passwordsPerPage = 5;

    const generatePassword = () => {
        const strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?/`~".split("");
        let len = 16;
        let password = "";
        while (len--) {
            password += strings[Math.floor(Math.random() * strings.length)];
        }
        const newPasswords = [password, ...passwords];
        setPasswords(newPasswords);
        localStorage.setItem("passwords", JSON.stringify(newPasswords));
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPassword = currentPage * passwordsPerPage;
    const indexOfFirstPassword = indexOfLastPassword - passwordsPerPage;
    const currentPasswords = passwords.slice(indexOfFirstPassword, indexOfLastPassword);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-6">Password Generator</h3>
            <div className="flex flex-col space-y-6">
                <div className="text-center text-lg bg-white p-4 rounded shadow">
                    Last Generated: <span className="font-mono">{passwords[0] || "No Passwords Generated Yet!"}</span>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 mx-auto"
                    onClick={generatePassword}
                >
                    Generate
                </button>
                <ol className="list-none space-y-2 bg-white p-4 rounded shadow">
                    {currentPasswords.map((p, i) => (
                        <li key={i} className="font-mono">{indexOfFirstPassword + i + 1}) {p}</li>
                    ))}
                </ol>
                <div className="flex justify-center gap-2">
                    <button
                        className="px-3 py-1 rounded-md bg-gray-200"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className="px-3 py-1 rounded-md bg-gray-200"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(passwords.length / passwordsPerPage)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

