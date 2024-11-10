import { Suspense } from "react";
import Quiz from './Quiz';

// Convert to a Server Component by removing 'use client'
interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams; // Await the promise
    const userId = Array.isArray(params['user-id'])
        ? params['user-id'][0] || null
        : params['user-id'] || null;
    const fullName = Array.isArray(params['fullname']) 
        ? params['fullname'][0] || null 
        : (params['fullname'] as string | null);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Quiz userId={userId} fullName={fullName} />
        </Suspense>
    );
}
