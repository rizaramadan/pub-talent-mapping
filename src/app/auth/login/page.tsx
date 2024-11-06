'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { requestOtp, verifyOtp } from '../../actions/darisini-auth';
import { VeriftyOtpResponse, STORAGE_KEY } from "../../lib/VerifyOtpResponse";

export default function LoginForm() {
    //redirect to result if response exists
    const router = useRouter();
    useEffect(() => {
        const response = localStorage.getItem(STORAGE_KEY);
        if (response) {
            router.push("/result");
        }
    }, [router]);

    //show login form if no response exists
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const [preAuthSessionId, setPreAuthSessionId] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state


    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        
        const response = await requestOtp(formData);
        setDeviceId(response.data.deviceId); // Store deviceId
        setPreAuthSessionId(response.data.preAuthSessionId); // Store preAuthSessionId
        setIsOtpSent(true);
        setLoading(false); // Reset loading state after response
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('otp', otp);
        formData.append('deviceId', deviceId); // Include deviceId
        formData.append('preAuthSessionId', preAuthSessionId); // Include preAuthSessionId

        const response: VeriftyOtpResponse = await verifyOtp(formData);
        if (response.status) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
            router.push("/result");
        }
        else{

        }
    };

    return (
        <div className='page'>
            <main>
                {!isOtpSent ? (
                    <form onSubmit={handleEmailSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send OTP'} {/* Show loading text */}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <input type="hidden" name="email" value={email} />
                        <div>
                            <label htmlFor="otp">OTP</label>
                            <input 
                                id="otp" 
                                name="otp" 
                                type="text" 
                                placeholder="Enter OTP" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                )}
            </main>
        </div>
    )
}
