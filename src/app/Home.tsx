"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchAndRedirect = async () => {
      // Get URL parameters
      const userId = searchParams.get('user-id');
      const fullname = searchParams.get('fullname');

      // Validate parameters
      if (!userId || !fullname) {
        router.push("/input");
        return;
      }

      try {
        const url = `/api/get-result/${userId}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (!data || Object.keys(data).length === 0 || !data.userId) {
          // No result exists, redirect to quiz page with parameters
          router.push(`/quiz?user-id=${userId}&fullname=${fullname}`);
        } else {
          // Result exists, redirect to result page
          localStorage.setItem('resultData', JSON.stringify(data));
          router.push(`/result`);
        }
      } catch (error) {
        console.error('Error fetching result:', error);
        //router.push("/sorry");
      }
    };

    fetchAndRedirect();
  }, [router, searchParams]);

  return (
    <></>
  );
}
