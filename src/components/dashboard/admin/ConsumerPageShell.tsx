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

    const consumer = consumers.find((c) => c.id === selectedId)!;

    const handleSelectConsumer = (id: string) => {
        const c = consumers.find((c) => c.id === id)!;
        setSelectedId(id);
        setStatus(c.status);
        setReason("");
        setStatusOpen(false);
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
                <div className="flex bg-[#fafbfc] border-b border-(--qmt-border)">

                    {/* Left columns header */}
                    <div className="w-82.5 shrink-0 flex">
                        <span className="px-5 py-3 text-xs font-medium text-(--qmt-text-muted) w-20">User ID</span>
                        <span className="px-5 py-3 text-xs font-medium text-(--qmt-text-muted) flex-1">Name</span>
                    </div>

                    {/* Right: tab buttons */}
                    <div className="flex-1 flex items-center gap-1 border-l border-(--qmt-border) px-4">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
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

                {/* ── Body: left list + right details ── */}
                <div className="flex">

                    {/* Left consumer list */}
                    <div className="w-82.5 shrink-0 border-r border-(--qmt-border)">
                        {consumers.map((c, index) => (
                            <div
                                key={c.id}
                                onClick={() => handleSelectConsumer(c.id)}
                                className={`flex items-center cursor-pointer transition-colors hover:bg-gray-50 ${
                                    selectedId === c.id ? "bg-gray-50" : ""
                                } ${index < consumers.length - 1 ? "border-b border-(--qmt-border)" : ""}`}
                            >
                                <span className="px-5 py-3.5 text-[12.5px] text-(--qmt-text-muted) w-20">{c.id}</span>
                                <span className="px-5 py-3.5 text-[12.5px] font-medium text-(--qmt-text) flex-1">{c.name}</span>
                                <span className="py-3.5 pr-5"><StarRating filled={c.rating} /></span>
                            </div>
                        ))}
                    </div>

                    {/* Right panel */}
                    <div className="flex-1 p-6 flex flex-col gap-5">
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
