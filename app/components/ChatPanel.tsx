"use client";

import { useEffect, useRef, useState } from "react";

export interface ChatMessage {
  id: number;
  mine: boolean;
  text: string;
}

export default function ChatPanel({
  messages,
  connected,
  videoBusy,
  onSend,
  onStartVideo,
  onEnd,
}: {
  messages: ChatMessage[];
  connected: boolean;
  videoBusy: boolean;
  onSend: (text: string) => void;
  onStartVideo: () => void;
  onEnd: () => void;
}) {
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !connected) return;
    onSend(text);
    setDraft("");
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center p-3 sm:inset-y-0 sm:right-0 sm:left-auto sm:items-stretch sm:justify-end sm:p-4">
      <div className="glass pointer-events-auto flex h-[46vh] w-full max-w-md flex-col overflow-hidden rounded-3xl sm:h-auto sm:max-h-none sm:w-[380px]">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <p className="font-display text-lg font-light">Stranger</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              {connected ? "Peer to peer" : "Finding a path…"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onStartVideo}
              disabled={!connected || videoBusy}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium hover:border-white/30 disabled:opacity-40"
            >
              Video
            </button>
            <button
              onClick={onEnd}
              className="rounded-full bg-rose-500/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-400"
            >
              End
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {messages.length === 0 && (
            <p className="mt-10 text-center text-sm leading-relaxed text-zinc-500">
              Say hello. Messages travel directly between you — never stored,
              never seen by us.
            </p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.mine ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  m.mine
                    ? "bg-emerald-300 text-zinc-950"
                    : "bg-white/10 text-zinc-100"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={submit}
          className="flex gap-2 border-t border-white/10 p-3"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={connected ? "Write something human…" : "Connecting…"}
            disabled={!connected}
            className="flex-1 rounded-full bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-zinc-600 focus:ring-1 focus:ring-emerald-300/60 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!connected || !draft.trim()}
            className="rounded-full bg-emerald-300 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
