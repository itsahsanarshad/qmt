"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/admin/Sidebar";
import Header from "@/components/dashboard/admin/Header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-[#F7F9FC]">
            {/* Mobile overlay backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Right column */}
            <div className="flex flex-1 flex-col overflow-hidden min-w-0">
                {/* Sticky Header */}
                <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t border-[var(--qmt-border)] bg-white px-6 py-2.5 text-center text-[11px] text-[var(--qmt-text-muted)] shrink-0">
                    Copyright © Carry and Co | Designed by Jadoon design
                </footer>
            </div>
        </div>
    );
}
