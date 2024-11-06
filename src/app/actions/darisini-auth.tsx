"use server";

const API_URL = process.env.API_URL
const OTP_CREATE = process.env.OTP_CREATE
const OTP_VERIFY = process.env.OTP_VERIFY
const API_KEY = process.env.DARISINI_API_KEY

import { VeriftyOtpResponse } from "../lib/VerifyOtpResponse";
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY || ''
    };
}

export async function requestOtp(formData: FormData) {
    const email = formData.get('email');
    
    const response = await fetch(`${API_URL}/${OTP_CREATE}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error('Failed to send OTP');
    }

    const data = await response.json();
    console.log('Response from OTP API:', data); // Log the response to the server log
    return data;
}

export async function verifyOtp(formData: FormData) : Promise<VeriftyOtpResponse> {
    const requestBody = JSON.stringify({ 
        userInputCode: formData.get('otp'),
        deviceId: formData.get('deviceId'),
        preAuthSessionId: formData.get('preAuthSessionId'),
        expiresIn: 60
    });
    const response = await fetch(`${API_URL}/${OTP_VERIFY}`, {
        method: 'POST',
        headers: getHeaders(),
        body: requestBody,
    });

    if (!response.ok) {
        throw new Error('Invalid OTP');
    }

    const data: VeriftyOtpResponse = await response.json();    
    return data;
}
