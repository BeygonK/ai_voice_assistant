"use client";
import { Button } from "@/components/ui/button";
import { List } from "@/utils/List";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import React, { use } from "react";

function Feature() {
  const user = useUser();
  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg mb-4">
        <div>
          <h1 className="font-light text-gray-500 text-2xl">My Workspace</h1>
          <h2 className="text-2xl font-bold">Welcome, {user?.displayName}</h2>
        </div>
        <Button variant={"destructive"}>My Profile</Button>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 p-4 bg-white rounded-lg">
        {List.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={150}
              height={150}
              className="h-[70px] w-[70px]"
            />
            <h1>{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
