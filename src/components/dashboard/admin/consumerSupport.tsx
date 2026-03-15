"use client";

import { useState } from "react";
import { Consumer, SupportTicket, TicketStatus } from "@/data/userData";

interface Props {
    consumer: Consumer;
}

const TICKET_STATUSES: TicketStatus[] = ["Inprogress", "Resolved"];

function TicketRow({ ticket }: { ticket: SupportTicket }) {
    const [open, setOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<TicketStatus>(ticket.status);

    return (
        <tr className="border-b border-(--qmt-border) last:border-0">
            <td className="py-3 text-[12.5px] text-(--qmt-text-muted) w-28">{ticket.date}</td>
            <td className="py-3 text-[12.5px] text-(--qmt-text-muted) w-24">{ticket.type}</td>
            <td className="py-3 text-[12.5px] text-(--qmt-text-muted) flex-1">{ticket.details}</td>
            <td className="py-3 text-right">
                <div className="relative inline-block">
                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] text-(--qmt-text) border border-(--qmt-border) rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                        {currentStatus}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className={`transition-transform ${open ? "rotate-180" : ""}`}>
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                    {open && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-(--qmt-border) rounded-lg shadow-sm overflow-hidden z-10">
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

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div>
                <h3 className="text-[14px] font-semibold text-(--qmt-text)">Support Details</h3>
                <div className="flex gap-8 mt-1">
                    <span className="text-[12.5px] text-(--qmt-text-muted)">Total Tickets ({tickets.length}</span>
                    <span className="text-[12.5px] text-(--qmt-text-muted)">warnings: ({warnings})</span>
                    <span className="text-[12.5px] text-(--qmt-text-muted)">Restrictions: ({restrictions})</span>
                </div>
            </div>

            {/* Table */}
            {tickets.length === 0 ? (
                <p className="text-[13px] text-(--qmt-text-muted)">No support tickets yet.</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-(--qmt-border)">
                            <th className="pb-2 text-left text-[12px] font-medium text-(--qmt-text-muted) w-28">Date</th>
                            <th className="pb-2 text-left text-[12px] font-medium text-(--qmt-text-muted) w-24">Type</th>
                            <th className="pb-2 text-left text-[12px] font-medium text-(--qmt-text-muted)">Details</th>
                            <th className="pb-2 text-right text-[12px] font-medium text-(--qmt-text-muted)">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <TicketRow key={ticket.id} ticket={ticket} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
