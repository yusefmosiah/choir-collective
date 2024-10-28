"use client";
import DashboardFeature from "@/components/dashboard/dashboard-feature";
import { getConfig } from "@/config";

export default function Page() {
  const { api: { url: apiUrl } } = getConfig();

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

  // Get all environment variables
  const allEnvVars = { ...process.env };

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
          <h3 className="font-bold mb-2">All Environment Variables:</h3>
          <pre className="whitespace-pre-wrap break-words text-xs">
            {JSON.stringify(allEnvVars, null, 2)}
          </pre>
          <div className="mt-4">
            <p className="font-semibold">NODE_ENV: {process.env.NODE_ENV}</p>
            <p className="font-semibold">Build Time: {new Date().toISOString()}</p>
            <p className="font-semibold">API URL from config: {apiUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
