// src/app/api/apiClient.ts
'use client'
import { STORAGE_KEY, VeriftyOtpResponse } from "../lib/VerifyOtpResponse";

const API_URL = process.env.API_URL
const TOKEN_REFRESH = process.env.TOKEN_REFRESH


function getHeaders(accessToken: string) {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
    };
}

export class ApiClient {
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    constructor(accessToken: string, refreshToken: string) {
        // Load tokens from local storage or cookies
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    private async refreshAccessToken(): Promise<void> {
        if (!this.refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${API_URL}/${TOKEN_REFRESH}`, {
            method: 'POST',
            headers: getHeaders(this.accessToken || ''),
            body: JSON.stringify({ refreshToken: this.refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh access token');
        }

        const data = await response.json();
        this.accessToken = data.accessToken; // Update the access token
        this.refreshToken = data.refreshToken; // Update the refresh token if provided

        if (data.status && this.accessToken && this.refreshToken) {
            const otpResponse: VeriftyOtpResponse = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            otpResponse.data.accessToken = this.accessToken;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(otpResponse));           
        }
    }

    private async makeRequest(url: string, options: RequestInit = {}): Promise<Response> {
        // Add the access token to the request headers
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${this.accessToken}`,
        };

        // Make initial request
        let response = await fetch(url, { ...options, headers });

        // If we get a 4xx response, try refreshing token and retry the request once
        if (response.status >= 400 && response.status < 500) {
            await this.refreshAccessToken();
            
            // Update headers with new token and retry request
            headers.Authorization = `Bearer ${this.accessToken}`;
            response = await fetch(url, { ...options, headers });
        }

        return response;
    }

    public async get(url: string): Promise<Response> {
        return this.makeRequest(url, { method: 'GET' });
    }

    public async post(url: string, body: any): Promise<Response> {
        return this.makeRequest(url, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    // Add other HTTP methods (PUT, DELETE, etc.) as needed
}
