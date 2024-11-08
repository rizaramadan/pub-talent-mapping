'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Input() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (fullName.trim().length < 2) {
            setError('Please enter your full name (minimum 2 characters)');
            return;
        }

        router.push(`/?user-id=${encodeURIComponent(email)}&fullname=${encodeURIComponent(fullName)}`);
    };

    return (
        <div className="min-vh-100 d-flex align-items-center" 
             style={{
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
             }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h1 className="h3 fw-bold text-primary mb-2">Welcome!</h1>
                                    <p className="text-muted">Start your personality journey</p>
                                </div>
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label text-muted small fw-bold">
                                            Email Address
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="bi bi-envelope-fill text-primary"></i>
                                            </span>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-control bg-light border-start-0 ps-0"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="fullName" className="form-label text-muted small fw-bold">
                                            Full Name
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="bi bi-person-fill text-primary"></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="fullName"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="form-control bg-light border-start-0 ps-0"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <i className="bi bi-exclamation-circle-fill me-2"></i>
                                            <div>{error}</div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Continue
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}