"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Consumer, TourRequest } from "@/data/userData";

/* ── types ─────────────────────────────────────────────────── */
export interface FlatTrip extends TourRequest {
    consumer: Consumer;
}

type ActiveTab = "Active Trips" | "Completed Trips";

interface Props {
    trips: FlatTrip[];
    activeTab: ActiveTab;
}

const ITEMS_PER_PAGE = 4;

/* ── helpers ───────────────────────────────────────────────── */
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

const Chip = ({ label }: { label: string }) => (
    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[11px] text-blue-700 border border-blue-100 whitespace-nowrap">
        {label}
    </span>
);

const ChevronDown = ({ open }: { open: boolean }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={`transition-transform ${open ? "rotate-180" : ""}`}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

/* ── simple dropdown ───────────────────────────────────────── */
function Dropdown({ label, options, value, onChange }: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 text-[12.5px] text-(--qmt-text) whitespace-nowrap"
            >
                {value || label} <ChevronDown open={open} />
            </button>
            {open && (
                <div className="absolute top-full mt-2 left-0 min-w-36 bg-white border border-(--qmt-border) rounded-lg shadow-md z-20 overflow-hidden">
                    <button
                        onClick={() => { onChange(""); setOpen(false); }}
                        className="w-full text-left px-3 py-2 text-[12.5px] text-(--qmt-text-muted) hover:bg-gray-50"
                    >
                        All
                    </button>
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-[12.5px] hover:bg-gray-50 ${value === opt ? "font-semibold text-(--qmt-text)" : "text-(--qmt-text-muted)"}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── trip card ─────────────────────────────────────────────── */
function TripCard({ trip, highlight, onRemove }: { trip: FlatTrip; highlight?: boolean; onRemove: (id: string) => void }) {
    const { consumer } = trip;
    const activeTours = consumer.tourRequests.filter((t) => t.status === "Active").length;
    const completedTours = consumer.tourRequests.filter((t) => t.status === "Completed").length;

    return (
        <div className={`flex gap-6 p-5 ${highlight ? "rounded-xl border border-(--qmt-border) shadow-sm" : "border-b border-(--qmt-border) last:border-0"}`}>
            {/* Left: tour info */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-[13.5px] font-semibold text-(--qmt-text)">{trip.title}</span>
                    <span className="text-[12.5px] text-(--qmt-text-muted) whitespace-nowrap">
                        Bids {String(trip.bids).padStart(2, "0")}
                    </span>
                </div>
                <div className="flex wrap gap-1.5">
                    <Chip label={trip.type} />
                    <Chip label={trip.dateRange} />
                    <Chip label={trip.destination} />
                    <Chip label={`${trip.persons} Person`} />
                    <Chip label={`$${trip.budget.toLocaleString()}`} />
                    <Chip label={trip.duration} />
                </div>
                <p className="text-[12px] text-(--qmt-text-muted)">{trip.description}</p>
            </div>

            {/* Right: consumer info */}
            <div className="flex flex-col gap-1 min-w-44 pt-0.5">
                <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-(--qmt-text)">{consumer.name}</span>
                    <StarRating filled={consumer.rating} />
                </div>
                <span className="text-[12px] text-(--qmt-text-muted)">{consumer.country}</span>
                <span className="text-[12px] text-(--qmt-text-muted)">{consumer.state}</span>
                <div className="flex gap-4 mt-1">
                    <span className="text-[11.5px] text-(--qmt-text-muted)">Active Tours ({activeTours})</span>
                    <span className="text-[11.5px] text-(--qmt-text-muted)">Completed Tours ({completedTours})</span>
                </div>
            </div>

            {/* Remove button */}
            <div className="flex items-start pt-0.5">
                <button
                    onClick={() => onRemove(trip.id)}
                    className="px-3.5 py-1.5 text-[12.5px] font-medium text-(--qmt-text) border border-(--qmt-border) rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

/* ── main shell ────────────────────────────────────────────── */
export function TripPageShell({ trips: initialTrips, activeTab }: Props) {
    const [localTrips, setLocalTrips] = useState(initialTrips);
    /* filter state */
    const [tourType, setTourType] = useState("");
    const [budgetMin, setBudgetMin] = useState("");
    const [budgetMax, setBudgetMax] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [applied, setApplied] = useState(false);

    /* pagination */
    const [page, setPage] = useState(1);

    const tourTypes = useMemo(() => [...new Set(localTrips.map((t) => t.type))], [localTrips]);
    const statusOptions = useMemo(() => [...new Set(localTrips.map((t) => t.status))], [localTrips]);

    /* apply filter */
    const filtered = useMemo(() => {
        if (!applied) return localTrips;
        return localTrips.filter((t) => {
            if (tourType && t.type !== tourType) return false;
            if (statusFilter && t.status !== statusFilter) return false;

            // Budget filter
            if (budgetMin && t.budget < parseInt(budgetMin.replace(/[^0-9]/g, ""))) return false;
            if (budgetMax && t.budget > parseInt(budgetMax.replace(/[^0-9]/g, ""))) return false;

            return true;
        });
    }, [localTrips, applied, tourType, statusFilter, budgetMin, budgetMax]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleApply = () => {
        setApplied(true);
        setPage(1);
    };

    const handleRemove = (tripId: string) => {
        setLocalTrips((prev) => prev.filter((t) => t.id !== tripId));
    };

    const budgetValue = budgetMin || budgetMax ? `${budgetMin || "Min"} — ${budgetMax || "Max"}` : "";
    return (
        <div>
            {/* page heading + tab switcher */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-(--qmt-text)">Trip Management</h2>
                <div className="flex bg-white border border-(--qmt-border) rounded-full p-0.5">
                    <Link
                        href="/dashboard/admin/trips/active"
                        className={`px-4 py-1.5 text-xs rounded-full transition-colors whitespace-nowrap ${activeTab === "Active Trips"
                            ? "bg-white border border-(--qmt-border) text-(--qmt-text) font-semibold shadow-sm"
                            : "text-(--qmt-text-muted) hover:text-(--qmt-text)"
                            }`}
                    >
                        Active Trips
                    </Link>
                    <Link
                        href="/dashboard/admin/trips/completed"
                        className={`px-4 py-1.5 text-xs rounded-full transition-colors whitespace-nowrap ${activeTab === "Completed Trips"
                            ? "bg-white border border-(--qmt-border) text-(--qmt-text) font-semibold shadow-sm"
                            : "text-(--qmt-text-muted) hover:text-(--qmt-text)"
                            }`}
                    >
                        Completed Trips
                    </Link>
                </div>
            </div>

            {/* outer card */}
            <div className="bg-white rounded-xl border border-(--qmt-border) overflow-hidden">

                {/* ── Filter bar ── */}
                <div className="px-6 py-4 border-b border-(--qmt-border) flex items-end gap-6 flex-wrap">

                    {/* Tour Type */}
                    <div className="flex flex-col gap-1.5">
                        <Dropdown
                            label="Tour Type"
                            options={tourTypes}
                            value={tourType}
                            onChange={(v) => { setTourType(v); setApplied(false); }}
                        />
                        <div className="px-2.5 py-1.5 rounded border border-(--qmt-border) text-[11.5px] text-(--qmt-text-muted) bg-white min-w-28">
                            {tourType || "[ All Tours ]"}
                        </div>
                    </div>

                    {/* Budget Range */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[12.5px] text-(--qmt-text)">Budget Range</span>
                        <div className="flex items-center gap-1">
                            <input
                                value={budgetMin}
                                onChange={(e) => setBudgetMin(e.target.value)}
                                placeholder="[ Min Price ]"
                                className="w-24 px-2 py-1 text-[11.5px] border border-(--qmt-border) rounded outline-none text-(--qmt-text-muted) placeholder:text-(--qmt-text-muted)"
                            />
                            <span className="text-[11px] text-(--qmt-text-muted)">—</span>
                            <input
                                value={budgetMax}
                                onChange={(e) => setBudgetMax(e.target.value)}
                                placeholder="[ Max Price ]"
                                className="w-24 px-2 py-1 text-[11.5px] border border-(--qmt-border) rounded outline-none text-(--qmt-text-muted) placeholder:text-(--qmt-text-muted)"
                            />
                        </div>
                    </div>

                    {/* Date Range - Disabled */}
                    <div className="flex flex-col gap-1.5 opacity-40 pointer-events-none">
                        <span className="text-[12.5px] text-(--qmt-text)">Date Range</span>
                        <div className="flex items-center gap-1">
                            <input
                                disabled
                                value={dateStart}
                                onChange={(e) => setDateStart(e.target.value)}
                                placeholder="[ Start Date ]"
                                className="w-24 px-2 py-1 text-[11.5px] border border-(--qmt-border) rounded outline-none text-(--qmt-text-muted) placeholder:text-(--qmt-text-muted)"
                            />
                            <span className="text-[11px] text-(--qmt-text-muted)">—</span>
                            <input
                                disabled
                                value={dateEnd}
                                onChange={(e) => setDateEnd(e.target.value)}
                                placeholder="[ End Date ]"
                                className="w-24 px-2 py-1 text-[11.5px] border border-(--qmt-border) rounded outline-none text-(--qmt-text-muted) placeholder:text-(--qmt-text-muted)"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    {/* <div className="flex flex-col gap-1.5">
                        <Dropdown
                            label="Status ▼"
                            options={statusOptions}
                            value={statusFilter}
                            onChange={(v) => { setStatusFilter(v); setApplied(false); }}
                        />
                        <div className="px-2 py-1 text-[11.5px] text-(--qmt-text-muted)">
                            {statusFilter || "Open"}
                        </div>
                    </div> */}

                    {/* Apply filter */}
                    <button
                        onClick={handleApply}
                        className="self-end mb-0.5 px-4 py-1.5 text-[12px] font-medium border border-orange-300 text-orange-500 bg-orange-50 rounded-full hover:bg-orange-100 transition-colors whitespace-nowrap"
                    >
                        Apply Filter
                    </button>
                </div>

                {/* ── Trip list ── */}
                <div>
                    {paginated.length === 0 ? (
                        <div className="flex items-center justify-center h-40 text-[13px] text-(--qmt-text-muted)">
                            No trips found.
                        </div>
                    ) : (
                        paginated.map((trip, idx) => (
                            <TripCard key={trip.id} trip={trip} highlight={idx === 1} onRemove={handleRemove} />
                        ))
                    )}
                </div>

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-end gap-1 px-6 py-4 border-t border-(--qmt-border)">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-7 h-7 text-[12.5px] rounded-full transition-colors ${page === p
                                    ? "bg-(--qmt-text) text-white font-semibold"
                                    : "text-(--qmt-text-muted) hover:bg-gray-100"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        {page < totalPages && (
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="w-7 h-7 text-[12.5px] text-(--qmt-text-muted) hover:bg-gray-100 rounded-full"
                            >
                                ›
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
