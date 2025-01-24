"use client";
import { useAppContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useAppContext();
  useEffect(() => {
    if (!user) {
      return router.replace("/login");
    }
  }, []);
  function logout() {
    sessionStorage.removeItem("user");
    setUser(null);
    router.replace("/login");
  }

  if (!user) return <span className="loading loading-dots loading-lg"></span>;

  return (
    <>
      <Navbar
        logout={logout}
        username={user?.data?.name}
        email={user?.data?.email}
      />
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-5xl font-bold">Wellcome</h1>
        <Modal discription={"pakisatn tujhe sallam "} />
      </div>
    </>
  );
}
// export default withAuth(Home)
