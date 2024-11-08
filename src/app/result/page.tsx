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

    // Calculate percentages
    const getPercentage = (value: number) => (value / 5) * 100;

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
