"use client";

import { useState } from "react";
import { Consumer, StatusOption } from "@/data/userData";
import { ConsumerAccountDetails } from "./consumerAccountDetails";
import { ConsumerTourReq } from "./consumerTourReq";
import { ConsumerProfileHistory } from "./consumerProfileHistory";
import { ConsumerSupport } from "./consumerSupport";

const TABS = ["Account Details", "Tour request", "Profile History", "Support"] as const;
type Tab = (typeof TABS)[number];

/* ─── Star Rating ─────────────────────────────────────────── */
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

interface Props {
    consumers: Consumer[];
    title: string;
    variant: "list" | "hold";
}

export function ConsumerPageShell({ consumers, title, variant }: Props) {
    const [selectedId, setSelectedId] = useState<string>(consumers[0]?.id ?? "");
    const [activeTab, setActiveTab] = useState<Tab>("Account Details");
    const [statusOpen, setStatusOpen] = useState(false);
    const [status, setStatus] = useState<StatusOption>(consumers[0]?.status ?? "Reinstate");
    const [reason, setReason] = useState("");
    /* mobile: toggle between list and detail */
    const [showDetail, setShowDetail] = useState(false);

    const consumer = consumers.find((c) => c.id === selectedId)!;

    const handleSelectConsumer = (id: string) => {
        const c = consumers.find((c) => c.id === id)!;
        setSelectedId(id);
        setStatus(c.status);
        setReason("");
        setStatusOpen(false);
        setShowDetail(true);   // auto-navigate to detail on small screens
    };

    if (!consumer) {
        return (
            <div className="flex items-center justify-center h-40 text-[13px] text-(--qmt-text-muted)">
                No consumers to display.
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-sm font-semibold text-(--qmt-text) mb-4">{title}</h2>

            {/* Outer card */}
            <div className="bg-white rounded-xl border border-(--qmt-border) overflow-hidden">

                {/* ── Full-width header row ── */}
                <div className="flex flex-col lg:flex-row bg-[#fafbfc] border-b border-(--qmt-border)">

                    {/* Left columns header — hidden on small, visible lg+ */}
                    <div className="hidden lg:flex lg:w-72 xl:w-80 2xl:w-96 shrink-0">
                        <span className="px-4 py-3 text-xs font-medium text-(--qmt-text-muted) w-16 xl:w-20">User ID</span>
                        <span className="px-4 py-3 text-xs font-medium text-(--qmt-text-muted) flex-1">Name</span>
                    </div>

                    {/* Tab buttons */}
                    <div className="flex-1 flex items-center gap-1 lg:border-l border-(--qmt-border) px-3 lg:px-4 py-2 overflow-x-auto scrollbar-hide">
                        {/* Back button — only on mobile when detail is shown */}
                        {showDetail && (
                            <button
                                onClick={() => setShowDetail(false)}
                                className="lg:hidden shrink-0 mr-2 text-[11px] text-(--qmt-text-muted) hover:text-(--qmt-text) flex items-center gap-1 whitespace-nowrap"
                            >
                                ← Back
                            </button>
                        )}
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-2.5 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors shrink-0 ${
                                    activeTab === tab
                                        ? "border border-(--qmt-border) text-(--qmt-text) font-semibold bg-white"
                                        : "text-(--qmt-text-muted) hover:text-(--qmt-text)"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="flex flex-col lg:flex-row">

                    {/* Left consumer list — full width on mobile unless detail is shown */}
                    <div className={`lg:w-72 xl:w-80 2xl:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-(--qmt-border) ${showDetail ? "hidden lg:block" : "block"}`}>
                        {consumers.map((c, index) => (
                            <div
                                key={c.id}
                                onClick={() => handleSelectConsumer(c.id)}
                                className={`flex items-center cursor-pointer transition-colors hover:bg-gray-50 ${
                                    selectedId === c.id ? "bg-gray-50" : ""
                                } ${index < consumers.length - 1 ? "border-b border-(--qmt-border)" : ""}`}
                            >
                                <span className="px-4 py-3.5 text-[12px] text-(--qmt-text-muted) w-16 xl:w-20 shrink-0">{c.id}</span>
                                <span className="px-3 py-3.5 text-[12.5px] font-medium text-(--qmt-text) flex-1 truncate">{c.name}</span>
                                <span className="py-3.5 pr-4 shrink-0"><StarRating filled={c.rating} /></span>
                            </div>
                        ))}
                    </div>

                    {/* Right panel — hidden on mobile unless detail is shown */}
                    <div className={`flex-1 p-4 sm:p-5 lg:p-6 flex flex-col gap-5 ${showDetail || true ? "block" : "hidden"} ${!showDetail ? "hidden lg:block" : "block"}`}>
                        {activeTab === "Account Details" && (
                            <ConsumerAccountDetails
                                consumer={consumer}
                                variant={variant}
                                status={status}
                                setStatus={setStatus}
                                reason={reason}
                                setReason={setReason}
                                statusOpen={statusOpen}
                                setStatusOpen={setStatusOpen}
                            />
                        )}
                        {activeTab === "Tour request" && (
                            <ConsumerTourReq consumer={consumer} />
                        )}
                        {activeTab === "Profile History" && (
                            <ConsumerProfileHistory consumer={consumer} />
                        )}
                        {activeTab === "Support" && (
                            <ConsumerSupport consumer={consumer} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
