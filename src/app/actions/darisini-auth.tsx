"use server";

const API_URL = process.env.API_URL
const OTP_CREATE = process.env.OTP_CREATE
const API_KEY = process.env.DARISINI_API_KEY

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

