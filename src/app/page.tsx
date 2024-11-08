"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

//http://localhost:4000/?user-id=donwafiqo@gmail.com&fullname=abc

export default function Home() {
  
  const BACKEND_API_URL = "http://localhost:4000/api";
  const BACKEND_GET_RESULT = "get-result";
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchAndRedirect = async () => {
      // Get URL parameters
      const userId = searchParams.get('user-id');
      const fullname = searchParams.get('fullname');

      // Validate parameters
      if (!userId || !fullname) {
        router.push("/invalid-params");
        return;
      }

      try {
        const url = `${BACKEND_API_URL}/${BACKEND_GET_RESULT}/${userId}`;
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

  return null;
}
