"use client";

import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  currentKey: string;
}

const Search: React.FC<Props> = ({ currentKey }) => {
  function onSearchHandler(formData: FormData) {
    const key = formData.get("key") as string;

    if (!key || key.trim().length === 0 || key === currentKey) {
      return;
    }

    redirect(`/search-users?key=${key}`);
  }

  return (
    <form className="flex justify-center" action={onSearchHandler}>
      <Input
        classNames={{
          base: "h-10 max-w-full ",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-s-xl rounded-e-none",
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        name="key"
        className="rounded-e-none"
        defaultValue={currentKey}
      />
      <Button color="primary" className="rounded-l-none" type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
};

export default Search;
