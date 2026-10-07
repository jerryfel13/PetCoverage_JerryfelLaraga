"use client";

export default function ConnectionPrompt({
  title,
  subtitle,
  acceptLabel,
  declineLabel,
  onAccept,
  onDecline,
}: {
  title: string;
  subtitle?: string;
  acceptLabel: string;
  declineLabel: string;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 p-6 backdrop-blur-sm">
      <div className="glass w-full max-w-sm rounded-3xl p-7 text-center text-zinc-100">
        <div className="mx-auto mb-4 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(126,227,194,0.9)]" />
        <h2 className="font-display text-2xl font-light">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{subtitle}</p>
        )}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onDecline}
            className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-white/30"
          >
            {declineLabel}
          </button>
          <button
            onClick={onAccept}
            className="flex-1 rounded-full bg-emerald-300 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-200"
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
