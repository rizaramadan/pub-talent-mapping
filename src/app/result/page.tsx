"use client";

import { useEffect, useState } from "react"; // Import useEffect and useState
import { PersonalityResult, ResultData } from './PersonalityResult';

export default function ResultPage() {
    const [resultData, setResultData] = useState<ResultData | null>(null); // Use the interface

    useEffect(() => {
        const data = localStorage.getItem('resultData');
        if (data) {
            setResultData(JSON.parse(data)); // TypeScript will infer the type
        }
    }, []);

    return (
        <div className="page">
            <main>
                {resultData && (
                    <PersonalityResult resultData={resultData} />
                )}
            </main>
            
        </div>
    );
}
