"use client";

import { useGetUserData } from "@/service/queries";
import Loader from "components/common/Loader";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthProvider({ children }) {
  const router = useRouter();

  const { isPending, data } = useGetUserData();
  useEffect(() => {
    if (!isPending && !data?.data) router.push("/");
  }, [isPending]);

  if (isPending)
    return (
      <div className="h-screen flex justify-center items-center z-20">
        <Loader />
      </div>
    );

  return <div>{children}</div>;
}

export default AuthProvider;
