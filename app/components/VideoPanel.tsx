"use client";

import { useEffect, useRef } from "react";

export default function VideoPanel({
  localStream,
  remoteStream,
  onEnd,
}: {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  onEnd: () => void;
}) {
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localRef.current && localRef.current.srcObject !== localStream) {
      localRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteRef.current && remoteRef.current.srcObject !== remoteStream) {
      remoteRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-black">
      <div className="relative flex-1">
        <video
          ref={remoteRef}
          autoPlay
          playsInline
          className="h-full w-full bg-zinc-950 object-cover"
        />
        {!remoteStream && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-500">
            Waiting for the other camera…
          </div>
        )}
        <video
          ref={localRef}
          autoPlay
          playsInline
          muted
          className="absolute bottom-5 right-5 h-36 w-24 rounded-2xl border border-white/20 bg-zinc-900 object-cover shadow-2xl sm:h-44 sm:w-32"
        />
      </div>
      <div className="flex justify-center bg-zinc-950/90 p-4">
        <button
          onClick={onEnd}
          className="rounded-full bg-rose-500 px-8 py-3 text-sm font-semibold text-white hover:bg-rose-400"
        >
          End video
        </button>
      </div>
    </div>
  );
}
