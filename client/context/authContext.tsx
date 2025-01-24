"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  console.log(`User ======>  ${user}`);
  useEffect(() => {
    const data = sessionStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);
  // Sign up function
  async function signup(name: string, email: string, password: string) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/signup`,
        {
          name,
          email,
          password,
        }
      );
      console.log("Register data => ", response.data);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      toast.success(response.data.message);
    } catch (e: any) {
      console.log(e.message);
      if (e.response) {
        toast.error(e.response.data.message);
      }
    }
  }

  // Login Form function
  async function login(email: string, password: string) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/login`,
        {
          email,
          password,
        }
      );
      toast.success(response.data.message);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
    } catch (e: any) {
      console.log(e.message);
      if (e.response) {
        toast.error(e.response.data.message);
      }
    }
  }

  return (
    <AppContext.Provider value={{ user, setUser, signup, login }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a UserContextProvider");
  }
  return context;
}
