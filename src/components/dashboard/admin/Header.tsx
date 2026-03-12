"use client";

import { useState } from "react";
import { Search, Bell, MessageSquare, ChevronDown, Menu } from "lucide-react";

interface HeaderProps {
    title?: string;
    searchPlaceholder?: string;
    onMenuClick: () => void;
}

export default function Header({
    title = "Administration & Moderation",
    searchPlaceholder = "Search by Consumer ID or Name",
    onMenuClick,
}: HeaderProps) {
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        console.log("Search:", searchQuery.trim());
        setSearchQuery("");
    };

    return (
        <header className="h-20 bg-white border-b border-(--qmt-border) flex items-center px-3 sm:px-5 gap-3 sticky top-0 z-10 shrink-0">

            {/* Hamburger — mobile/tablet only */}
            <button
                onClick={onMenuClick}
                className="lg:hidden p-1.5 -ml-1 text-(--qmt-text-muted) hover:text-(--qmt-text) transition-colors shrink-0"
                aria-label="Toggle sidebar"
            >
                <Menu size={20} strokeWidth={2} />
            </button>

            {/* Page Title — hidden on xs, visible from sm */}
            <h1 className="hidden sm:block text-lg font-medium text-(--qmt-text) whitespace-nowrap shrink-0 m-0">
                {title}
            </h1>

            {/* Search Bar — hidden on xs, visible from md */}
            <div className="hidden md:flex flex-1 max-w-xs relative items-center">
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full h-12 rounded-full pl-3 pr-10 text-xs bg-[#F7F9FC] font-[inherit] outline-none transition-colors duration-150"
                    style={{
                        border: `1px solid ${searchFocused ? "var(--qmt-blue)" : "var(--qmt-border)"}`,
                        color: "var(--qmt-text)",
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-2.5 text-(--qmt-text-muted) hover:text-(--qmt-text) flex items-center transition-colors bg-transparent border-none cursor-pointer p-0"
                    aria-label="Submit search"
                    tabIndex={-1}
                >
                    <Search size={18} strokeWidth={2} />
                </button>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right Actions */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                {/* Message Icon */}
                <button className="relative p-1 text-(--qmt-text-muted) hover:text-(--qmt-text) transition-colors bg-transparent border-none cursor-pointer flex items-center">
                    <MessageSquare size={18} strokeWidth={1.8} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-(--qmt-blue) rounded-full border-2 border-white" />
                </button>

                {/* Bell Icon */}
                <button className="relative p-1 text-(--qmt-text-muted) hover:text-(--qmt-text) transition-colors bg-transparent border-none cursor-pointer flex items-center">
                    <Bell size={18} strokeWidth={1.8} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-amber-400 rounded-full border-2 border-white" />
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-2 cursor-pointer">
                    {/* Avatar */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-(--qmt-blue-light) border-2 border-(--qmt-border) flex items-center justify-center text-[10px] sm:text-[11px] font-semibold text-(--qmt-blue) shrink-0 select-none">
                        JC
                    </div>
                    {/* Name & Role — hidden on mobile, visible from md */}
                    <div className="hidden md:block leading-tight">
                        <div className="text-xs font-medium text-(--qmt-text)">John Carter</div>
                        <div className="text-[10.5px] text-(--qmt-text-muted)">Account settings</div>
                    </div>
                    <span className="hidden md:block text-(--qmt-text-muted)">
                        <ChevronDown size={12} strokeWidth={2.5} />
                    </span>
                </div>
            </div>
        </header>
    );
}
