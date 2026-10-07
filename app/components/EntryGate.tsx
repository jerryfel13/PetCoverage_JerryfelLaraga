"use client";

import { useState } from "react";

export default function EntryGate({
  onReady,
}: {
  onReady: (lat: number, lng: number) => void;
}) {
  const [status, setStatus] = useState<"idle" | "locating" | "error">("idle");
  const [error, setError] = useState<string>("");

  function enter() {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      setError("Your browser doesn't support location access.");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => onReady(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        setStatus("error");
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission is required to place you on the map."
            : "Couldn't get your location. Please try again.",
        );
      },
      { enableHighAccuracy: true, timeout: 15_000, maximumAge: 0 },
    );
  }

  return (
    <div className="aurora relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden p-6 text-zinc-100">
      <div
        className="aurora-orb h-64 w-64 bg-violet-400/40"
        style={{ top: "8%", left: "12%" }}
      />
      <div
        className="aurora-orb h-80 w-80 bg-emerald-300/30"
        style={{ bottom: "6%", right: "8%", animationDelay: "-6s" }}
      />

      <div className="relative z-10 max-w-lg text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-emerald-200/80">
          Live · Anonymous · Ephemeral
        </p>
        <h1 className="font-display mt-5 text-6xl font-light tracking-tight sm:text-7xl">
          Pulse
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-pretty text-base leading-relaxed text-zinc-300/90">
          A living globe of strangers. Your dot appears near you — never on you.
          Tap someone. Talk. When the tab closes, it never happened.
        </p>

        <button
          onClick={enter}
          disabled={status === "locating"}
          className="mt-10 rounded-full bg-emerald-300 px-9 py-3.5 text-sm font-semibold tracking-wide text-zinc-950 shadow-[0_0_40px_rgba(126,227,194,0.35)] transition hover:bg-emerald-200 disabled:opacity-60"
        >
          {status === "locating" ? "Finding your place…" : "Drop onto the globe"}
        </button>

        {status === "error" && (
          <p className="mt-5 text-sm text-rose-300">{error}</p>
        )}

        <p className="mx-auto mt-8 max-w-sm text-center text-xs leading-relaxed text-zinc-500">
          No accounts. Dots sit 1–3 km from your real location. Chat and video
          stay peer-to-peer — the server never sees them.
        </p>
      </div>
    </div>
  );
}
