"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { coachingExperts } from "@/utils/List";
import { UserButton } from "@stackframe/stack";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import RecordRTC from "recordrtc";

function DiscussionRoom() {
  const { roomid } = useParams();
  const [tutorName, setTutorName] = useState();
  const contentData = useQuery(api.contentRoom.GetContentRoomById, {
    id: roomid,
  });
  const [enableRecording, setEnableRecording] = useState(false);
  const recorder = useRef(null);
  const streamRef = useRef(null); // New ref for MediaStream
  const silenceTimeout = useRef(null);

  useEffect(() => {
    if (contentData) {
      const tutor = coachingExperts.find(
        (item) => item.name === contentData?.tutor
      );
      setTutorName(tutor);
    }
  }, [contentData]);

  const connectToServer = () => {
    setEnableRecording(true);
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      console.error(
        "Microphone access is only available in a browser environment"
      );
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        streamRef.current = stream; // Store the stream
        recorder.current = new RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/webm;codecs=pcm",
          recorderType: RecordRTC.StereoAudioRecorder,
          timeSlice: 250,
          desiredSampRate: 16000,
          numberOfAudioChannels: 1,
          bufferSize: 16384,
          audioBitsPerSecond: 128000,
          ondataavailable: async (blob) => {
            clearTimeout(silenceTimeout.current);
            const buffer = await blob.arrayBuffer();
            console.log("Audio buffer:", buffer);
            silenceTimeout.current = setTimeout(() => {
              console.log("Silence detected, stopping recording");
              disconnectFromServer();
            }, 2000);
          },
        });
        recorder.current.startRecording();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
        setEnableRecording(false); // Reset state on error
      });
  };

  const disconnectFromServer = (e) => {
    if (e) e.preventDefault();
    if (!recorder.current) {
      console.warn("No active recorder to disconnect");
      return;
    }

    try {
      clearTimeout(silenceTimeout.current);
      recorder.current.stopRecording(() => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop()); // Stop stream tracks
          streamRef.current = null; // Clear stream ref
        }
        recorder.current = null;
        console.log("Microphone disconnected and resources cleaned up");
        setEnableRecording(false);
      });
    } catch (error) {
      console.error("Error disconnecting from microphone:", error);
      setEnableRecording(false); // Reset state on error
    }
  };

  return (
    <div className="-mt-8">
      <h1 className="text-lg font-bold">{contentData?.topicOption}</h1>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <div className="h-[60vh] bg-secondary rounded-4xl flex flex-col items-center justify-center relative">
            <img
              src={tutorName?.avatar}
              alt="tutor"
              className="w-20 h-20 rounded-full object-cover animate-pulse"
            />
            <h1 className="text-lg font-bold">{contentData?.tutor}</h1>
            <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-5 right-5">
              <UserButton />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-5">
            {!enableRecording ? (
              <Button
                onClick={connectToServer}
                className="cursor-pointer"
                variant={"default"}
              >
                Connect
              </Button>
            ) : (
              <Button
                onClick={disconnectFromServer}
                variant="destructive"
                className="cursor-pointer"
              >
                Disconnect
              </Button>
            )}
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
