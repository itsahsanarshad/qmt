"use client";

import { Consumer, StatusOption } from "@/data/userData";

interface Props {
    consumer: Consumer;
    variant: "list" | "hold";
    status: StatusOption;
    setStatus: (s: StatusOption) => void;
    reason: string;
    setReason: (v: string) => void;
    statusOpen: boolean;
    setStatusOpen: (v: boolean) => void;
}

const STATUS_OPTIONS: StatusOption[] = ["Reinstate", "Suspended", "Restricted"];

export function ConsumerAccountDetails({
    consumer,
    variant,
    status,
    setStatus,
    reason,
    setReason,
    statusOpen,
    setStatusOpen,
}: Props) {
    /* ── shared sub-pieces ───────────────────────────────────────── */
    const ProfilePic = () => (
        <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gray-200">
                <img src={consumer.profilePic} alt="Profile" className="w-full h-full object-cover" />
            </div>
            {variant === "list" && (
                <span className="text-[11px] text-(--qmt-text-muted)">Profile Picture</span>
            )}
        </div>
    );

    const StatusDropdown = () => (
        <div className="relative w-full sm:w-52">
            <button
                onClick={() => setStatusOpen(!statusOpen)}
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
                    {STATUS_OPTIONS.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => { setStatus(opt); setStatusOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors hover:bg-gray-50 ${status === opt ? "font-semibold text-(--qmt-text)" : "text-(--qmt-text-muted)"}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    /* ── LIST variant ────────────────────────────────────────────── */
    if (variant === "list") {
        return (
            <>
                {/* Profile + fields */}
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">
                    <ProfilePic />

                    {/* Field grid — stacks on sm, side-by-side on md+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 flex-1 pt-1">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] text-(--qmt-text-muted)">First Name</span>
                            <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.firstName}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] text-(--qmt-text-muted)">Email Address</span>
                            <span className="text-[13px] text-(--qmt-text) font-medium break-all">{consumer.email}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] text-(--qmt-text-muted)">Last Name</span>
                            <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.lastName}</span>
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
                        <div className="flex flex-col gap-0.5 sm:col-span-2">
                            <span className="text-[11px] text-(--qmt-text-muted)">Phone Number</span>
                            <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.phone}</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-(--qmt-border)" />

                <StatusDropdown />

                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Reason of Restriction"
                    rows={3}
                    className="w-full rounded-2xl border border-(--qmt-border) px-4 py-3 text-[13px] text-(--qmt-text) placeholder:text-(--qmt-text-muted) resize-none outline-none focus:ring-1 focus:ring-gray-300 bg-white"
                />
            </>
        );
    }

    /* ── HOLD variant ────────────────────────────────────────────── */
    return (
        <>
            {/* Top: profile pic + fields */}
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">
                <ProfilePic />

                {/* Labels + field grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 flex-1 pt-1">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-(--qmt-text-muted)">First Name</span>
                        <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.firstName}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-(--qmt-text-muted)">Email Address</span>
                        <span className="text-[13px] text-(--qmt-text) font-medium break-all">{consumer.email}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-(--qmt-text-muted)">Last Name</span>
                        <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.lastName}</span>
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
                    <div className="flex flex-col gap-0.5 sm:col-span-2">
                        <span className="text-[11px] text-(--qmt-text-muted)">Phone Number</span>
                        <span className="text-[13px] text-(--qmt-text) font-medium">{consumer.phone}</span>
                    </div>
                </div>
            </div>

            <div className="border-t border-(--qmt-border)" />

            {/* Bottom: two-column layout */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">

                {/* Left: Account Status + dropdown + textarea */}
                <div className="flex flex-col gap-4 flex-1 w-full">
                    <div>
                        <p className="text-[13px] font-semibold text-(--qmt-text)">Account Status</p>
                        <p className="text-[12.5px] text-(--qmt-text-muted) mt-0.5">{consumer.status}</p>
                    </div>
                    <StatusDropdown />
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Reason of Restriction"
                        rows={3}
                        className="w-full rounded-lg border border-(--qmt-border) px-4 py-3 text-[13px] text-(--qmt-text) placeholder:text-(--qmt-text-muted) resize-none outline-none focus:ring-1 focus:ring-gray-300 bg-white"
                    />
                </div>

                {/* Right: progress stats + restriction details */}
                <div className="flex flex-col gap-2 pt-1 md:min-w-40 lg:min-w-48">
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
    );
}
