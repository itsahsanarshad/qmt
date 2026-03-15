"use client";

import { Consumer } from "@/data/userData";

interface Props {
    consumer: Consumer;
}

const StarRating = ({ filled = 0 }: { filled?: number }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24"
                fill={i <= filled ? "#f59e0b" : "none"}
                stroke={i <= filled ? "#f59e0b" : "#d1d5db"}
                strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ))}
    </div>
);

const Chip = ({ label, variant = "date" }: { label: string; variant?: "date" | "guide" | "star"; rating?: number }) => {
    const base = "px-3 py-1 rounded-full text-[11.5px] border whitespace-nowrap";
    if (variant === "date") return <span className={`${base} bg-orange-50 text-orange-600 border-orange-100`}>{label}</span>;
    if (variant === "guide") return <span className={`${base} bg-blue-50 text-blue-700 border-blue-100`}>{label}</span>;
    return null;
};

export function ConsumerProfileHistory({ consumer }: Props) {
    const history = consumer.profileHistory;
    const totalProjects = history.length;

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div>
                <h3 className="text-[14px] font-semibold text-(--qmt-text)">Tour history</h3>
                <div className="flex gap-6 mt-1">
                    <span className="text-[12.5px] text-(--qmt-text-muted)">Total Reviews ({history.length})</span>
                    <span className="text-[12.5px] text-(--qmt-text-muted)">Total Projects({totalProjects})</span>
                </div>
            </div>

            {/* Review cards */}
            {history.length === 0 ? (
                <p className="text-[13px] text-(--qmt-text-muted)">No profile history yet.</p>
            ) : (
                history.map((entry) => (
                    <div key={entry.id} className="rounded-xl border border-(--qmt-border) p-4 flex flex-col gap-2.5">
                        {/* Title + Remove */}
                        <div className="flex items-start justify-between gap-4">
                            <span className="text-[13.5px] font-semibold text-(--qmt-text)">{entry.title}</span>
                            <button className="shrink-0 px-4 py-1.5 text-[12.5px] font-medium text-(--qmt-text) border border-(--qmt-border) rounded-lg hover:bg-gray-50 transition-colors">
                                Remove
                            </button>
                        </div>

                        {/* Chips row */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <Chip label={entry.dateRange} variant="date" />

                            {/* Star rating chip */}
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100">
                                <StarRating filled={entry.rating} />
                            </span>

                            <Chip label={entry.guideName} variant="guide" />
                        </div>

                        {/* Review text */}
                        <p className="text-[12.5px] text-(--qmt-text-muted)">{entry.review}</p>
                    </div>
                ))
            )}
        </div>
    );
}
