"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ADMIN_NAV } from "@/constants/adminNav";
import { User, UserCircle, Map, Headphones, ChevronRight, X } from "lucide-react";

const ChevronRightIcon = ({ open }: { open: boolean }) => (
    <ChevronRight
        size={12}
        className="transition-transform duration-200"
        style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    />
);

const ICON_MAP: Record<string, React.ReactNode> = {
    user: <User size={20} strokeWidth={1.8} />,
    "user-circle": <UserCircle size={20} strokeWidth={1.8} />,
    map: <Map size={20} strokeWidth={1.8} />,
    headphones: <Headphones size={20} strokeWidth={1.8} />,
};

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        ADMIN_NAV.forEach((section) => {
            initial[section.label] = section.items.some((item) => pathname.startsWith(item.href));
        });
        return initial;
    });

    const toggleSection = (label: string) =>
        setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

    return (
        <aside
            className={[
                // Base styles
                "flex flex-col bg-white border-r border-(--qmt-border) h-screen overflow-y-auto overflow-x-hidden shrink-0 z-40",
                // Mobile/tablet: fixed overlay drawer, slides in/out
                "fixed inset-y-0 left-0 transition-transform duration-250 ease-in-out lg:static lg:translate-x-0",
                // Width
                "w-75",
                // Open/closed state for mobile
                open ? "translate-x-0" : "-translate-x-full",
            ].join(" ")}
        >
            {/*Logo row*/}
            <div className="flex items-center justify-between px-3.5 py-4 border-b border-(--qmt-border) mb-1 shrink-0">
                <Link href="/dashboard/admin" className="flex items-center gap-1.5 min-w-0">
                    <Image
                        src="/images/logo-qmt.svg"
                        alt="QuoteMyTrip Logo"
                        width={120}
                        height={32}
                        className="h-8 w-auto object-contain"
                        priority
                    />
                </Link>
                {/* Close button — mobile only */}
                <button
                    onClick={onClose}
                    className="lg:hidden p-0.5 text-(--qmt-text-muted) hover:text-(--qmt-text) transition-colors"
                    aria-label="Close sidebar"
                >
                    <X size={18} />
                </button>
            </div>

            {/*Nav*/}
            <nav className="flex-1 py-2">
                {ADMIN_NAV.map((section) => {
                    const isOpen = openSections[section.label] ?? false;
                    const isSectionActive = section.items.some((item) => pathname.startsWith(item.href));

                    return (
                        <div key={section.label}>
                            {/* Section header */}
                            <button
                                onClick={() => toggleSection(section.label)}
                                className="w-full h- flex items-center gap-2 px-3.5 py-2 text-left select-none bg-transparent border-none cursor-pointer transition-colors hover:bg-gray-50"
                                style={{
                                    color: isSectionActive ? "var(--qmt-text)" : "var(--qmt-text-secondary)",
                                    fontWeight: isSectionActive ? 600 : 500,
                                    fontSize: "16px",
                                }}
                            >
                                <span style={{ color: isSectionActive ? "var(--qmt-blue)" : "var(--qmt-text-muted)" }} className="shrink-0">
                                    {ICON_MAP[section.icon]}
                                </span>
                                <span className="flex-1">{section.label}</span>
                                <span className="text-(--qmt-text-muted) shrink-0">
                                    <ChevronRightIcon open={isOpen} />
                                </span>
                            </button>

                            {/* Sub-items */}
                            {isOpen && (
                                <div className="pb-1">
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={onClose} // Close drawer on mobile nav
                                                className="block py-1.5 pr-3.5 pl-9.5  leading-snug transition-colors"
                                                style={{
                                                    fontWeight: isActive ? 600 : 400,
                                                    color: isActive ? "var(--qmt-text)" : "var(--qmt-text-muted)",
                                                    textDecoration: "none",
                                                    fontSize: "14px",
                                                }}
                                                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--qmt-text)"; }}
                                                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--qmt-text-muted)"; }}
                                            >
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Separator */}
                            <div className="h-px bg-(--qmt-border) my-0.5" />
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
