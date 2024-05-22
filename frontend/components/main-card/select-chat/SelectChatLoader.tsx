"use client";

import { Skeleton } from "@nextui-org/react";

const SelectChatLoader = () => {
  return (
    <div className="flex flex-col">
      <div className="p-3 cursor-pointer hover:bg-foreground-200 duration-200 flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-14 h-14" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
      <div className="p-3 cursor-pointer hover:bg-foreground-200 duration-200 flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-14 h-14" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
      <div className="p-3 cursor-pointer hover:bg-foreground-200 duration-200 flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-14 h-14" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SelectChatLoader;
