"use client";

import { useState } from "react";
import { Consumer, SupportTicket, TicketStatus } from "@/data/userData";

interface Props {
    consumer: Consumer;
}

const TICKET_STATUSES: TicketStatus[] = ["Inprogress", "Resolved"];
const ITEMS_PER_PAGE = 5;

function TicketRow({ ticket }: { ticket: SupportTicket }) {
    const [open, setOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<TicketStatus>(ticket.status);

    return (
        <tr className="border-b border-(--qmt-border) last:border-0">
            {/* Date — hidden on xs, shown sm+ */}
            <td className="py-3 pr-3 text-[12.5px] text-(--qmt-text-muted) hidden sm:table-cell whitespace-nowrap">{ticket.date}</td>
            {/* Type — hidden on xs, shown md+ */}
            <td className="py-3 pr-3 text-[12.5px] text-(--qmt-text-muted) hidden md:table-cell whitespace-nowrap">{ticket.type}</td>
            {/* Details — always shown */}
            <td className="py-3 pr-3 text-[12.5px] text-(--qmt-text-muted)">
                <div className="sm:hidden text-[11px] text-(--qmt-text-muted) mb-0.5">
                    {ticket.date} · {ticket.type}
                </div>
                {ticket.details}
            </td>
            <td className="py-3 text-right">
                <div className="relative inline-block">
                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[12px] text-(--qmt-text) border border-(--qmt-border) rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                        {currentStatus}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className={`transition-transform ${open ? "rotate-180" : ""}`}>
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                    {open && (
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-(--qmt-border) rounded-lg shadow-lg overflow-hidden z-50">
                            {TICKET_STATUSES.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => { setCurrentStatus(s); setOpen(false); }}
                                    className={`w-full text-left px-3 py-2 text-[12.5px] hover:bg-gray-50 transition-colors ${currentStatus === s ? "font-semibold text-(--qmt-text)" : "text-(--qmt-text-muted)"}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
}

export function ConsumerSupport({ consumer }: Props) {
    const tickets = consumer.supportTickets;
    const warnings = consumer.warnings;
    const restrictions = consumer.restrictionsCount;

    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(tickets.length / ITEMS_PER_PAGE));
    const paginated = tickets.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col gap-5 pb-16">
            {/* pb-16: gives enough bottom clearance so the last row's dropdown is NOT clipped by the outer card's overflow-hidden */}
            {/* Header */}
            <div>
                <h3 className="text-[14px] font-semibold text-(--qmt-text)">Support Details</h3>
                <div className="flex flex-wrap gap-4 sm:gap-8 mt-1">
                    <span className="text-[12.5px] text-(--qmt-text-muted)">Total Tickets ({tickets.length})</span>
                    <span className="text-[12.5px] text-(--qmt-text-muted)">Warnings: ({warnings})</span>
                    <span className="text-[12.5px] text-(--qmt-text-muted)">Restrictions: ({restrictions})</span>
                </div>
            </div>

            {/* Table */}
            {tickets.length === 0 ? (
                <p className="text-[13px] text-(--qmt-text-muted)">No support tickets yet.</p>
            ) : (
                <>
                    <div className="overflow-visible -mx-1">
                        <table className="w-full border-collapse min-w-75">
                            <thead>
                                <tr className="border-b border-(--qmt-border)">
                                    <th className="pb-2 text-left text-[12px] font-medium text-(--qmt-text-muted) hidden sm:table-cell pr-3 whitespace-nowrap">Date</th>
                                    <th className="pb-2 text-left text-[12px] font-medium text-(--qmt-text-muted) hidden md:table-cell pr-3 whitespace-nowrap">Type</th>
                                    <th className="pb-2 text-left text-[12px] font-medium text-(--qmt-text-muted)">Details</th>
                                    <th className="pb-2 text-right text-[12px] font-medium text-(--qmt-text-muted)">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((ticket) => (
                                    <TicketRow key={ticket.id} ticket={ticket} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center gap-1 pt-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-7 h-7 text-[12.5px] rounded-full transition-colors ${
                                        page === p
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
                </>
            )}
        </div>
    );
}
