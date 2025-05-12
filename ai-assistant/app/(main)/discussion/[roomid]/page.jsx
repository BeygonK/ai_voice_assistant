"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { coachingExperts, List } from "@/utils/List";
import { UserButton } from "@stackframe/stack";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function DiscussionRoom() {
  const { roomid } = useParams();
  const [tutorName, setTutorName] = useState();
  const contentData = useQuery(api.contentRoom.GetContentRoomById, {
    id: roomid,
  });

  useEffect(() => {
    if (contentData) {
      const tutor = coachingExperts.find(
        (item) => item.name === contentData?.tutor
      );
      //console.log("tutor", tutor);
      setTutorName(tutor);
    }
  }, [contentData]);
  //console.log("tutorName", tutorName);

  //console.log("contentData", contentData);
  const tutor = coachingExperts.find(
    (item) => item.name === contentData?.tutor
  );
  //console.log("tutor", tutor);
  return (
    <div className="-mt-8">
      <h1 className="text-lg font-bold">{contentData?.topicOption}</h1>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 ">
          <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col items-center justify-center relative">
            <img
              src={tutor?.avatar}
              alt="tutor"
              className="w-20 h-20 rounded-full object-cover animate-pulse"
            />
            <h1 className="text-lg font-bold">{contentData?.tutor}</h1>
            <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-5 right-5">
              <UserButton />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-5">
            <Button className={"cursor-pointer"}>Connect</Button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col items-center justify-center relative">
            <h2>Chat Section</h2>
          </div>
          <h2 className="mt-2 text-sm text-gray-500">
            Feedback will be provided by the tutor after the session is
            completed.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default DiscussionRoom;
