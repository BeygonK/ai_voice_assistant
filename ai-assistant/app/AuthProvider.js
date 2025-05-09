"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";

function AuthProvider({ children }) {
  const user = useUser();
  const createUser = useMutation(api.user.createUser);
  const [userDData, setUserData] = useState();

  useEffect(() => {
    if (user) {
      console.log("User logged in:", user);
      createNewUser(user);
    }
  }, [user]);

  const createNewUser = async (user) => {
    try {
      const result = await createUser({
        name: user.displayName,
        email: user.primaryEmail,
      });
      console.log("User created:", result);
      setUserData(result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export default AuthProvider;
