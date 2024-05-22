import Results from "@/components/add-friend/Results";
import ResultsSkeleton from "@/components/add-friend/ResultsSkeleton";
import Search from "@/components/add-friend/Search";
import { authOptions } from "@/utils/authOptions";
import { Card } from "@nextui-org/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Chatify | Search",
};

interface Props {
  searchParams: {
    key?: string;
  };
}

const page: React.FC<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth?mode=login");
  }

  return (
    <Card className="max-w-3xl p-5 mx-auto">
      <Search currentKey={searchParams.key || ""} />
      <Suspense fallback={<ResultsSkeleton />}>
        <Results searchKey={searchParams.key || ""} userId={session.user.id} />
      </Suspense>
    </Card>
  );
};

export default page;
