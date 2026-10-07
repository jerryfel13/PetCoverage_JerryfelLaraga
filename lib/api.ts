// Client-side helpers for talking to the coordination API.
import type { PollResponse, SignalType } from "@/lib/types";

export async function join(
  id: string,
  lat: number,
  lng: number,
): Promise<{ lat: number; lng: number }> {
  const res = await fetch("/api/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, lat, lng }),
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error(`join failed: ${res.status}`);
  const data = (await res.json()) as { lat?: number; lng?: number };
  return {
    lat: typeof data.lat === "number" ? data.lat : lat,
    lng: typeof data.lng === "number" ? data.lng : lng,
  };
}

export async function poll(id: string): Promise<PollResponse> {
  const res = await fetch(`/api/poll?id=${encodeURIComponent(id)}`, {
    cache: "no-store",
    credentials: "same-origin",
  });
  if (!res.ok) {
    const err = new Error(`poll failed: ${res.status}`) as Error & {
      status?: number;
    };
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function sendSignal(
  fromId: string,
  toId: string,
  type: SignalType,
  payload?: string,
): Promise<void> {
  await fetch("/api/signal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fromId, toId, type, payload }),
    credentials: "same-origin",
  });
}

// Fire-and-forget leave that survives the tab closing.
export function leave(id: string): void {
  const body = JSON.stringify({ id });
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/leave", blob);
  } else {
    void fetch("/api/leave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      credentials: "same-origin",
    });
  }
}
