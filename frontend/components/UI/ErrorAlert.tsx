import { CircleAlert } from "lucide-react";
import React from "react";

interface Props {
  text: string;
}

const ErrorAlert: React.FC<Props> = ({ text }) => {
  return (
    <div className="w-full flex items-center gap-3 bg-red-500 p-3 rounded-lg border-l-red-800 border-l-[1rem]">
      <CircleAlert /> {text}
    </div>
  );
};

export default ErrorAlert;
