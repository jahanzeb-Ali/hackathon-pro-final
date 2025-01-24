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
    <div className="h-screen">
      <Navbar logout={logout} />
      <div className="flex justify-center items-center h-[88vh] flex-col">
        <h1 className="text-8xl font-bold block">Jahanzeb</h1>
        <p className="text-2xl">WMA - 196798</p>
        <Modal discription={"pakisatn tujhe sallam "} />
      </div>
    </div>
  );
}
// export default withAuth(Home)
