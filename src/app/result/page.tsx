"use client";

import { useEffect, useState } from "react"; // Import useEffect and useState
import { useRouter } from "next/navigation";
import { STORAGE_KEY, VeriftyOtpResponse } from "../lib/VerifyOtpResponse";

export default function ResultPage() {
    //redirect to login if no response exists
    const router = useRouter();
    useEffect(() => {
        const storedResponse = localStorage.getItem(STORAGE_KEY); // Retrieve from localStorage
        if (!storedResponse) {
            router.push("/auth/login");
        }
        else {
            setOtpResponse(JSON.parse(storedResponse));

        }
    }, [router]); // Run once on mount

    const [otpResponse, setOtpResponse] = useState<VeriftyOtpResponse | null>(null); // State for OTP response
    return (
        <div className="page">
            {otpResponse && ( // Conditionally render the OTP response
                <div>
                    <h3>OTP Response:</h3>
                    <ul>
                        <li><strong>Status:</strong> {otpResponse.status ? "Success" : "Failure"}</li>
                        <li><strong>User:</strong>
                            <ul>
                                <li><strong>Email:</strong> {otpResponse.data.user.email}</li>
                                <li><strong>Full Name:</strong> {otpResponse.data.user.fullName}</li>
                                <li><strong>User ID:</strong> {otpResponse.data.user.userId}</li>
                            </ul>
                        </li>
                        <li><strong>Circle Profile:</strong>
                            <ul>
                                <li><strong>ID:</strong> {otpResponse.data.circleProfile.id}</li>
                                <li><strong>Name:</strong> {otpResponse.data.circleProfile.name}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}