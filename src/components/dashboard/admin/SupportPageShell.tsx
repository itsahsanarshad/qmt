"use client";

import { useState, useMemo } from "react";
import { Consumer, SupportTicket, TicketStatus } from "@/data/userData";

/* ── types ─────────────────────────────────────────────────── */
export interface FlatTicket extends SupportTicket {
    consumer: Consumer;
}

type ActiveTab = "In Progress" | "Resolved";

interface Props {
    tickets: FlatTicket[];
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

const Chip = ({ label, muted }: { label: string; muted?: boolean }) => (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] border whitespace-nowrap ${muted ? "bg-gray-50 text-gray-500 border-gray-200" : "bg-blue-50 text-blue-700 border-blue-100"}`}>
        {label}
    </span>
);

const ChevronDown = ({ open }: { open: boolean }) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={`transition-transform ${open ? "rotate-180" : ""}`}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

/* ── type filter dropdown ───────────────────────────────────── */
function Dropdown({ label, options, value, onChange }: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative flex flex-col gap-1.5">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 text-[12.5px] text-(--qmt-text) whitespace-nowrap"
            >
                {label} <ChevronDown open={open} />
            </button>
            <div className="px-2.5 py-1.5 rounded border border-(--qmt-border) text-[11.5px] text-(--qmt-text-muted) bg-white min-w-28 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(o => !o)}>
                {value || "[ All Types ]"}
            </div>
            {open && (
                <div className="absolute top-full mt-2 left-0 min-w-40 bg-white border border-(--qmt-border) rounded-lg shadow-md z-20 overflow-hidden">
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

/* ── status dropdown (inline on card) ──────────────────────── */
function StatusDropdown({ ticketId, currentStatus, onStatusChange }: {
    ticketId: string;
    currentStatus: TicketStatus;
    onStatusChange: (id: string, status: TicketStatus) => void;
}) {
    const [open, setOpen] = useState(false);
    const options: TicketStatus[] = ["Inprogress", "Resolved"];

    return (
        <div className="relative">
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium border border-(--qmt-border) rounded-lg bg-white hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm"
            >
                {currentStatus === "Inprogress" ? "In Progress" : "Resolved"}
                <ChevronDown open={open} />
            </button>
            {open && (
                <div className="absolute right-0 top-full mt-1.5 min-w-36 bg-white border border-(--qmt-border) rounded-lg shadow-lg z-30 overflow-hidden">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={(e) => {
                                e.stopPropagation();
                                onStatusChange(ticketId, opt);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-[12.5px] hover:bg-gray-50 transition-colors ${currentStatus === opt ? "font-semibold text-(--qmt-text) bg-gray-50" : "text-(--qmt-text-muted)"
                                }`}
                        >
                            {opt === "Inprogress" ? "In Progress" : "Resolved"}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── support card ───────────────────────────────────────────── */
function SupportCard({
    ticket,
    highlight,
    onStatusChange,
}: {
    ticket: FlatTicket;
    highlight?: boolean;
    onStatusChange: (id: string, status: TicketStatus) => void;
}) {
    const [hovered, setHovered] = useState(false);
    const { consumer } = ticket;
    const activeTours = consumer.tourRequests.filter((t) => t.status === "Active").length;
    const completedTours = consumer.tourRequests.filter((t) => t.status === "Completed").length;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 transition-colors ${highlight
                ? "rounded-xl border border-(--qmt-border) shadow-sm"
                : "border-b border-(--qmt-border) last:border-0"
                } hover:bg-gray-50/50`}
        >
            {/* Left: ticket info */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
                <span className="text-[13.5px] font-semibold text-(--qmt-text)">{ticket.details}</span>
                <div className="flex flex-wrap gap-1.5">
                    <Chip label={ticket.date} />
                    <Chip label={ticket.type} muted />
                </div>
                <p className="text-[12px] text-(--qmt-text-muted)">
                    Optional upload of an existing quote, image, or link where available
                </p>
            </div>

            {/* Right: consumer info — hidden on xs */}
            <div className="hidden sm:flex flex-col gap-1 sm:min-w-36 md:min-w-44 pt-0.5 shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-(--qmt-text)">{consumer.name}</span>
                    <StarRating filled={consumer.rating} />
                </div>
                <span className="text-[12px] text-(--qmt-text-muted)">{consumer.country}</span>
                <span className="text-[12px] text-(--qmt-text-muted)">{consumer.state}</span>
                <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[11.5px] text-(--qmt-text-muted)">Active ({activeTours})</span>
                    <span className="text-[11.5px] text-(--qmt-text-muted)">Completed ({completedTours})</span>
                </div>
            </div>

            {/* Status dropdown — always visible on mobile (no hover on touch), hover on desktop */}
            <div className={`flex sm:items-start sm:pt-0.5 transition-opacity sm:${hovered || highlight ? "opacity-100" : "opacity-0"}`}>
                <StatusDropdown
                    ticketId={ticket.id}
                    currentStatus={ticket.status}
                    onStatusChange={onStatusChange}
                />
            </div>
        </div>
    );
}

/* ── main shell ─────────────────────────────────────────────── */
export function SupportPageShell({ tickets: initialTickets, activeTab: initialActiveTab }: Props) {
    const [localTickets, setLocalTickets] = useState(initialTickets);
    const [activeTab, setActiveTab] = useState<ActiveTab>(initialActiveTab);
    const [typeFilter, setTypeFilter] = useState("");
    const [applied, setApplied] = useState(false);
    const [page, setPage] = useState(1);

    const ticketTypes = useMemo(() => [...new Set(localTickets.map((t) => t.type))], [localTickets]);

    /* tab-filtered list */
    const tabFiltered = useMemo(() =>
        localTickets.filter((t) =>
            activeTab === "In Progress" ? t.status === "Inprogress" : t.status === "Resolved"
        ),
        [localTickets, activeTab]
    );

    /* further apply filter */
    const filtered = useMemo(() => {
        if (!applied) return tabFiltered;
        return tabFiltered.filter((t) => {
            if (typeFilter && t.type !== typeFilter) return false;
            return true;
        });
    }, [tabFiltered, applied, typeFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleApply = () => { setApplied(true); setPage(1); };

    const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
        setLocalTickets((prev) =>
            prev.map((t) => t.id === ticketId ? { ...t, status: newStatus } : t)
        );
        setPage(1);
    };

    const handleTabChange = (tab: ActiveTab) => {
        setActiveTab(tab);
        setApplied(false);
        setTypeFilter("");
        setPage(1);
    };

    return (
        <div>
            {/* heading + tab switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-sm font-semibold text-(--qmt-text)">Agent Support</h2>
                <div className="flex bg-white border border-(--qmt-border) rounded-full p-0.5 self-start sm:self-auto">
                    {(["In Progress", "Resolved"] as ActiveTab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-4 py-1.5 text-xs rounded-full transition-colors whitespace-nowrap ${activeTab === tab
                                ? "bg-white border border-(--qmt-border) text-(--qmt-text) font-semibold shadow-sm"
                                : "text-(--qmt-text-muted) hover:text-(--qmt-text)"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* outer card */}
            <div className="bg-white rounded-xl border border-(--qmt-border) overflow-hidden shadow-sm">

                {/* ── Filter bar ── */}
                <div className="px-4 sm:px-6 py-4 border-b border-(--qmt-border) flex items-start gap-4 sm:gap-6 md:gap-8 flex-wrap">

                    {/* Type filter */}
                    <Dropdown
                        label="Ticket Type"
                        options={ticketTypes}
                        value={typeFilter}
                        onChange={(v) => { setTypeFilter(v); setApplied(false); }}
                    />

                    {/* Budget Range — disabled/visual only */}
                    {/* <div className="flex flex-col gap-1.5 opacity-40 pointer-events-none">
                        <span className="flex items-center gap-1.5 text-[12.5px] text-(--qmt-text-muted) whitespace-nowrap">
                            Budget Range <ChevronDown open={false} />
                        </span>
                        <div className="px-2.5 py-1.5 rounded border border-(--qmt-border) text-[11.5px] text-(--qmt-text-muted) bg-white min-w-40">
                            [ start date ] — [ End date ]
                        </div>
                    </div> */}

                    {/* Status — disabled/visual only */}
                    {/* <div className="flex flex-col gap-1.5 opacity-40 pointer-events-none">
                        <span className="flex items-center gap-1.5 text-[12.5px] text-(--qmt-text-muted) whitespace-nowrap">
                            Status <ChevronDown open={false} />
                        </span>
                        <div className="px-2.5 py-1.5 rounded border border-(--qmt-border) text-[11.5px] text-(--qmt-text-muted) bg-white min-w-20">
                            Open
                        </div>
                    </div> */}

                    {/* Apply filter */}
                    <button
                        onClick={handleApply}
                        className="self-end px-6 py-1.5 text-[12.5px] font-semibold border border-orange-200 text-orange-500 bg-orange-50 rounded-full hover:bg-orange-100 transition-all shadow-sm active:scale-95"
                    >
                        Apply Filter
                    </button>
                </div>

                {/* ── Ticket list ── */}
                <div>
                    {paginated.length === 0 ? (
                        <div className="flex items-center justify-center h-40 text-[13px] text-(--qmt-text-muted)">
                            No tickets found.
                        </div>
                    ) : (
                        paginated.map((ticket, idx) => (
                            <SupportCard
                                key={ticket.id}
                                ticket={ticket}
                                // highlight={idx === 1}
                                onStatusChange={handleStatusChange}
                            />
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
