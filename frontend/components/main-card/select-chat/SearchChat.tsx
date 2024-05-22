"use client";

import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

interface Props {
  value: string;
  onSearch: (term: string) => void;
}

const SearchChat: React.FC<Props> = ({ value, onSearch }) => {
  return (
    <div>
      <Input
        classNames={{
          base: "max-w-full p-3",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Type to search..."
        size="lg"
        startContent={<SearchIcon size={18} />}
        type="search"
        name="key"
        className="rounded-e-none"
        value={value}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchChat;
