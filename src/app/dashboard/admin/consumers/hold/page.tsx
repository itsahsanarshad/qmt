"use client";

import { useState } from "react";
import { consumers, StatusOption } from "@/data/userData";

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

const TABS = ["Account Details", "Tour request", "Profile History", "Support"] as const;
type Tab = (typeof TABS)[number];

/* Only show held consumers (Restricted or Suspended) */
const heldConsumers = consumers.filter(
    (c) => c.status === "Restricted" || c.status === "Suspended"
);

/* ─── Page ────────────────────────────────────────────────── */
export default function AdminConsumerHoldPage() {
    const [selectedId, setSelectedId] = useState<string>(heldConsumers[0].id);
    const [activeTab, setActiveTab] = useState<Tab>("Account Details");
    const [statusOpen, setStatusOpen] = useState(false);
    const [status, setStatus] = useState<StatusOption>(heldConsumers[0].status);
    const [reason, setReason] = useState("");

    const statusOptions: StatusOption[] = ["Reinstate", "Suspended", "Restricted"];

    const consumer = heldConsumers.find((c) => c.id === selectedId)!;

    const handleSelectConsumer = (id: string) => {
        const c = heldConsumers.find((c) => c.id === id)!;
        setSelectedId(id);
        setStatus(c.status);
        setReason("");
        setStatusOpen(false);
    };

    return (
        <div>
            <h2 className="text-sm font-semibold text-(--qmt-text) mb-4">
                Consumer hold
            </h2>

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
                                className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${activeTab === tab
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
                        {heldConsumers.map((c, index) => (
                            <div
                                key={c.id}
                                onClick={() => handleSelectConsumer(c.id)}
                                className={`flex items-center cursor-pointer transition-colors hover:bg-gray-50 ${selectedId === c.id ? "bg-gray-50" : ""
                                    } ${index < heldConsumers.length - 1 ? "border-b border-(--qmt-border)" : ""}`}
                            >
                                <span className="px-5 py-3.5 text-[12.5px] text-(--qmt-text-muted) w-20">{c.id}</span>
                                <span className="px-5 py-3.5 text-[12.5px] font-medium text-(--qmt-text) flex-1">{c.name}</span>
                                <span className="py-3.5 pr-5"><StarRating filled={c.rating} /></span>
                            </div>
                        ))}
                    </div>

                    {/* Right panel */}
                    <div className="flex-1 p-6 flex flex-col gap-5">

                        {activeTab === "Account Details" ? (
                            <>
                                {/* ── Top section: Profile pic + labels only ── */}
                                <div className="flex gap-8 items-start">

                                    {/* Profile picture */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                                            <img
                                                src={consumer.profilePic}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Left labels only */}
                                    <div className="flex flex-col gap-5 pt-1">
                                        <span className="text-[12.5px] text-(--qmt-text-muted)">First Name</span>
                                        <span className="text-[12.5px] text-(--qmt-text-muted)">Last Name</span>
                                        <span className="text-[12.5px] text-(--qmt-text-muted)">Profile Picture</span>
                                    </div>

                                    {/* Right labels + values */}
                                    <div className="flex flex-col gap-4 pt-1">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] text-(--qmt-text-muted)">Email Address</span>
                                            <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.email}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] text-(--qmt-text-muted)">Date of Birth</span>
                                            <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.dob}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] text-(--qmt-text-muted)">Country</span>
                                            <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.country}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] text-(--qmt-text-muted)">State</span>
                                            <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.state}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] text-(--qmt-text-muted)">Phone Number</span>
                                            <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-(--qmt-border)" />

                                {/* ── Bottom section: two-column layout ── */}
                                <div className="flex gap-8 items-start">

                                    {/* Left col: Account Status + dropdown + textarea */}
                                    <div className="flex flex-col gap-4 flex-1">
                                        {/* Account Status heading + value */}
                                        <div>
                                            <p className="text-[13px] font-semibold text-(--qmt-text)">Account Status</p>
                                            <p className="text-[12.5px] text-(--qmt-text-muted) mt-0.5">{consumer.status}</p>
                                        </div>

                                        {/* Status dropdown */}
                                        <div className="relative w-52">
                                            <button
                                                onClick={() => setStatusOpen((o) => !o)}
                                                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-(--qmt-border) text-[13px] text-(--qmt-text) bg-white hover:bg-gray-50 transition-colors"
                                            >
                                                <span>Status</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className={`transition-transform ${statusOpen ? "rotate-180" : ""}`}>
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </button>

                                            {statusOpen && (
                                                <div className="absolute top-full mt-1 w-full bg-white border border-(--qmt-border) rounded-lg shadow-sm overflow-hidden z-10">
                                                    {statusOptions.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => { setStatus(opt); setStatusOpen(false); }}
                                                            className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors hover:bg-gray-50 ${status === opt
                                                                ? "font-semibold text-(--qmt-text)"
                                                                : "text-(--qmt-text-muted)"
                                                                }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Reason textarea */}
                                        <textarea
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            placeholder="Reason of Restriction"
                                            rows={3}
                                            className="w-full rounded-lg border border-(--qmt-border) px-4 py-3 text-[13px] text-(--qmt-text) placeholder:text-(--qmt-text-muted) resize-none outline-none focus:ring-1 focus:ring-gray-300 bg-white"
                                        />
                                    </div>

                                    {/* Right col: Stats + Restriction details */}
                                    <div className="flex flex-col gap-2 pt-1 min-w-45">
                                        <span className="text-[12.5px] text-(--qmt-text-muted)">{consumer.progress} days Progress</span>
                                        <span className="text-[12.5px] text-(--qmt-text-muted)">{consumer.warnings} Warnings</span>
                                        <span className="text-[12.5px] text-(--qmt-text-muted)">{consumer.restrictionsCount} Restriction</span>

                                        <div className="mt-4">
                                            <p className="text-[13px] font-semibold text-(--qmt-text)">Restriction details</p>
                                            <p className="text-[12.5px] text-(--qmt-text-muted) mt-1">{consumer.restrictionDetails}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-40 text-[13px] text-(--qmt-text-muted)">
                                {activeTab} — Coming soon
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
