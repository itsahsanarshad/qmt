export type NavItem = {
    label: string;
    href: string;
};

export type NavSection = {
    label: string;
    icon: string; // lucide icon name or svg key
    items: NavItem[];
};

export const ADMIN_NAV: NavSection[] = [
    {
        label: "Agent",
        icon: "user",
        items: [
            { label: "New Agent Request", href: "/dashboard/admin/agents/new-requests" },
            { label: "Approved Agents List", href: "/dashboard/admin/agents/approved" },
            { label: "Agents on hold", href: "/dashboard/admin/agents/on-hold" },
            { label: "Rejected Agents", href: "/dashboard/admin/agents/rejected" },
            { label: "Membership Tiers & Credits", href: "/dashboard/admin/agents/membership" },
            { label: "Agent Levels", href: "/dashboard/admin/agents/levels" },
        ],
    },
    {
        label: "Consumer",
        icon: "user-circle",
        items: [
            { label: "Consumer List", href: "/dashboard/admin/consumers" },
            { label: "Consumer hold", href: "/dashboard/admin/consumers/hold" },
        ],
    },
    {
        label: "Trip Management",
        icon: "map",
        items: [
            { label: "Active Trips", href: "/dashboard/admin/trips/active" },
            { label: "Completed Trips", href: "/dashboard/admin/trips/completed" },
        ],
    },
    {
        label: "Support",
        icon: "headphones",
        items: [
            { label: "Agent Support", href: "/dashboard/admin/support/agent" },
            { label: "Consumer Support", href: "/dashboard/admin/support/consumer" },
        ],
    },
];
