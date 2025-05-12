"use client";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { List } from "@/utils/List";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import React from "react";
import InputDialog from "./InputDialog";

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
          <BlurFade key={item.icon} delay={0.25 + index * 0.05} inView>
            <div className="flex flex-col justify-center items-center bg-gray-50 rounded-lg hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
              <InputDialog itemOptions={item}>
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="h-[70px] w-[70px] hover:rotate-12 transition duration-300 ease-in-out cursor-pointer"
                />
                <h1>{item.name}</h1>
              </InputDialog>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default Feature;
