import { Spinner } from "@nextui-org/react";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <Spinner size="lg" label="Loading..." color="primary" labelColor="primary" />
    </div>
  );
};

export default loading;
