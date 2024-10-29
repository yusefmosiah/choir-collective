"use client";
import React from "react";
import ThreadList from "@/components/ThreadList/ThreadList";
import ChoirChat from "@/components/ChoirChat/ChoirChat";
import PriorPanel from "@/components/PriorPanel/PriorPanel";

export default function Page() {
  return (
    <div className="flex h-full w-full">
      <div className="w-1/4 bg-base-200 overflow-y-auto border-r border-base-300">
        <ThreadList />
      </div>
      <div className="w-1/2 bg-base-100 flex flex-col">
        <ChoirChat />
      </div>
      <div className="w-1/4 bg-base-200 overflow-y-auto border-l border-base-300">
        <PriorPanel />
      </div>
    </div>
  );
}
