"use client";
import DashboardFeature from "@/components/dashboard/dashboard-feature";
import { getConfig } from "@/config";
import { useEffect, useState } from "react";

export default function Page() {
  const { api: { url: apiUrl } } = getConfig();
  const [buildEnv, setBuildEnv] = useState<string>('');
  const [clientLoadTime] = useState(new Date().toISOString()); // Capture initial load time

  // Fetch environment info from an API route
  useEffect(() => {
    fetch('/api/env-info')
      .then(res => res.json())
      .then(data => setBuildEnv(JSON.stringify(data, null, 2)))
      .catch(err => console.error('Error fetching env info:', err));
  }, []);

  const handleClick = async () => {
    try {
      console.log("Attempting to call API at:", apiUrl);
      const response = await fetch(`${apiUrl}/api/log-click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const errorStack = error instanceof Error ? error.stack : undefined;

      console.error("Detailed error:", {
        message: errorMessage,
        stack: errorStack,
        url: `${apiUrl}/api/log-click`,
      });
    }
  };

  return (
    <div>
      <DashboardFeature />
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Test Backend
        </button>
        <div className="text-sm text-gray-600">API URL: {apiUrl}</div>

        {/* Debug section */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg w-full max-w-2xl">
          <h3 className="font-bold mb-2">Client Environment:</h3>
          <pre className="whitespace-pre-wrap break-words text-xs">
            {JSON.stringify({
              NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
              NODE_ENV: process.env.NODE_ENV,
              CLIENT_LOAD_TIME: clientLoadTime,
              API_URL_FROM_CONFIG: apiUrl
            }, null, 2)}
          </pre>

          <h3 className="font-bold mt-4 mb-2">Server Environment:</h3>
          <pre className="whitespace-pre-wrap break-words text-xs">
            {buildEnv}
          </pre>
        </div>
      </div>
    </div>
  );
}
