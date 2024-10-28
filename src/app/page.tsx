"use client";
import DashboardFeature from "@/components/dashboard/dashboard-feature";
import { getConfig } from "@/config";

export default function Page() {
  const {
    api: { url: apiUrl },
  } = getConfig();

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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
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
      </div>
    </div>
  );
}
