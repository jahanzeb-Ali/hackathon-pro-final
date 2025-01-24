"use client";
import { useAppContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const { user, setUser } = useAppContext();
  useEffect(() => {
    if (!user) {
      return router.replace("/login");
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <h1>Wellcome to karachi </h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            sessionStorage.removeItem("user");
            setUser(null);
            router.replace("/login");
          }}
        >
          {" Logout"}
        </button>
      </div>
    </>
  );
}
// export default withAuth(Home)
