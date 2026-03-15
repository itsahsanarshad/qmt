"use client";

import { Consumer } from "@/data/userData";

interface Props {
    consumer: Consumer;
}

const Chip = ({ label }: { label: string }) => (
    <span className="px-3 py-1 rounded-full bg-blue-50 text-[11.5px] text-blue-700 border border-blue-100 whitespace-nowrap">
        {label}
    </span>
);

export function ConsumerTourReq({ consumer }: Props) {
    const active = consumer.tourRequests.filter((t) => t.status === "Active");
    const completed = consumer.tourRequests.filter((t) => t.status === "Completed");

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div>
                <h3 className="text-[14px] font-semibold text-(--qmt-text)">Consumer hold</h3>
                <div className="flex gap-6 mt-1">
                    <span className="text-[12.5px] text-(--qmt-text-muted)">Active Tours ({active.length})</span>
                    <span className="text-[12.5px] text-(--qmt-text-muted)">Completed Tours ({completed.length})</span>
                </div>
            </div>

            {/* Tour cards */}
            {consumer.tourRequests.length === 0 ? (
                <p className="text-[13px] text-(--qmt-text-muted)">No tour requests yet.</p>
            ) : (
                consumer.tourRequests.map((tour) => (
                    <div key={tour.id} className="flex flex-col gap-2">
                        {/* Title + bids */}
                        <div className="flex items-center justify-between">
                            <span className="text-[13.5px] font-semibold text-(--qmt-text)">{tour.title}</span>
                            <span className="text-[12.5px] text-(--qmt-text-muted)">Bids {String(tour.bids).padStart(2, "0")}</span>
                        </div>

                        {/* Tag chips */}
                        <div className="flex flex-wrap gap-2">
                            <Chip label={tour.type} />
                            <Chip label={tour.dateRange} />
                            <Chip label={tour.destination} />
                            <Chip label={`${tour.persons} Person`} />
                            <Chip label={tour.budget} />
                            <Chip label={tour.duration} />
                        </div>

                        {/* Description */}
                        <p className="text-[12.5px] text-(--qmt-text-muted)">{tour.description}</p>
                    </div>
                ))
            )}
        </div>
    );
}
