export type StatusOption = "Reinstate" | "Suspended" | "Restricted";
export type TourStatus = "Active" | "Completed" | "Pending";
export type TicketStatus = "Inprogress" | "Resolved";

/* ── Tour Request ─────────────────────────────────────────────── */
export interface TourRequest {
    id: string;
    title: string;
    bids: number;
    type: string;
    dateRange: string;
    destination: string;
    persons: number;
    budget: number;
    duration: string;
    description: string;
    status: TourStatus;
}

/* ── Profile History ──────────────────────────────────────────── */
export interface ProfileEntry {
    id: string;
    title: string;
    dateRange: string;
    rating: number;
    guideName: string;
    review: string;
}

/* ── Support Ticket ───────────────────────────────────────────── */
export interface SupportTicket {
    id: string;
    date: string;
    type: string;
    details: string;
    status: TicketStatus;
}

/* ── Consumer ─────────────────────────────────────────────────── */
export interface Consumer {
    id: string;
    name: string;
    rating: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    country: string;
    state: string;
    phone: string;
    profilePic: string;
    status: StatusOption;
    // Hold-page specific fields
    progress: number;
    warnings: number;
    restrictionsCount: number;
    restrictionDetails: string;
    // Tab data
    tourRequests: TourRequest[];
    profileHistory: ProfileEntry[];
    supportTickets: SupportTicket[];
}

export const consumers: Consumer[] = [
    {
        id: "001",
        name: "Alex Smith",
        rating: 0,
        firstName: "Alex",
        lastName: "Smith",
        email: "alex.smith@email.com",
        dob: "12 Mar 1992",
        country: "United States",
        state: "California",
        phone: "+1 (415) 000-0001",
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
        status: "Restricted",
        progress: 90,
        warnings: 2,
        restrictionsCount: 1,
        restrictionDetails: "Violated the privacy Policy of the platform",
        tourRequests: [
            {
                id: "tr-001-a",
                title: "Package Holiday for 2 week",
                bids: 3,
                type: "Package Holiday",
                dateRange: "Dec 26, 2025 — Jan 26, 2026",
                destination: "Destination",
                persons: 4,
                budget: 20000,
                duration: "10 mints",
                description: "Optional upload of an existing quote, image, or link where available",
                status: "Active",
            },
            {
                id: "tr-001-b",
                title: "Weekend City Break",
                bids: 1,
                type: "City Break",
                dateRange: "Mar 10, 2026 — Mar 12, 2026",
                destination: "New York",
                persons: 2,
                budget: 3500,
                duration: "2 days",
                description: "Looking for a guided city tour with hotel included.",
                status: "Active",
            },
        ],
        profileHistory: [
            {
                id: "ph-001-a",
                title: "Package Holiday for 2 week",
                dateRange: "Dec 26, 2025 — Jan 25, 2026",
                rating: 4,
                guideName: "Sohail Khan",
                review: "Great to work with Sohail, He has guided through out the process.",
            },
            {
                id: "ph-001-b",
                title: "Package Holiday for 2 week",
                dateRange: "Dec 26, 2025 — Jan 25, 2026",
                rating: 3,
                guideName: "Lisa Haven",
                review: "Great to work with Sohail, He has guided through out the process.",
            },
        ],
        supportTickets: [
            {
                id: "st-001-a",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
            {
                id: "st-001-b",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Resolved",
            },
        ],
    },
    {
        id: "002",
        name: "Lisa Heaven",
        rating: 0,
        firstName: "Lisa",
        lastName: "Heaven",
        email: "lisa.heaven@email.com",
        dob: "05 Jul 1995",
        country: "United Kingdom",
        state: "London",
        phone: "+44 7700 900002",
        profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
        status: "Suspended",
        progress: 45,
        warnings: 3,
        restrictionsCount: 2,
        restrictionDetails: "Repeated harassment reports from other users",
        tourRequests: [
            {
                id: "tr-002-a",
                title: "Safari Adventure 10 Days",
                bids: 5,
                type: "Adventure",
                dateRange: "Jun 1, 2026 — Jun 10, 2026",
                destination: "Kenya",
                persons: 2,
                budget: 8000,
                duration: "10 days",
                description: "Looking for a fully guided safari experience with accommodation.",
                status: "Pending",
            },
        ],
        profileHistory: [
            {
                id: "ph-002-a",
                title: "European Road Trip",
                dateRange: "Aug 5, 2025 — Aug 20, 2025",
                rating: 5,
                guideName: "Marco Rossi",
                review: "Absolutely wonderful trip, Marco was very professional and knowledgeable.",
            },
            {
                id: "ph-002-b",
                title: "Island Hopping Greece",
                dateRange: "Sep 1, 2025 — Sep 14, 2025",
                rating: 4,
                guideName: "Elena Papadaki",
                review: "Loved every island. Would book again with Elena.",
            },
            {
                id: "ph-002-c",
                title: "Package Holiday for 2 week",
                dateRange: "Dec 26, 2025 — Jan 25, 2026",
                rating: 3,
                guideName: "Sohail Khan",
                review: "Great to work with Sohail, He has guided through out the process.",
            },
        ],
        supportTickets: [
            {
                id: "st-002-a",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
            {
                id: "st-002-b",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Resolved",
            },
            {
                id: "st-002-c",
                date: "Mar 01, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
        ],
    },
    {
        id: "003",
        name: "James Rook",
        rating: 0,
        firstName: "James",
        lastName: "Rook",
        email: "james.rook@email.com",
        dob: "19 Nov 1988",
        country: "Canada",
        state: "Ontario",
        phone: "+1 (647) 000-0003",
        profilePic: "https://randomuser.me/api/portraits/men/65.jpg",
        status: "Reinstate",
        progress: 12,
        warnings: 0,
        restrictionsCount: 0,
        restrictionDetails: "",
        tourRequests: [
            {
                id: "tr-003-a",
                title: "Ski Trip Rocky Mountains",
                bids: 2,
                type: "Adventure",
                dateRange: "Jan 15, 2026 — Jan 22, 2026",
                destination: "Banff, Canada",
                persons: 6,
                budget: 12000,
                duration: "7 days",
                description: "Family ski trip with equipment rental and ski instructor.",
                status: "Active",
            },
        ],
        profileHistory: [],
        supportTickets: [
            {
                id: "st-003-a",
                date: "Jan 10, 2025",
                type: "Support",
                details: "Account verification issue",
                status: "Resolved",
            },
        ],
    },
    {
        id: "004",
        name: "Sara Lune",
        rating: 0,
        firstName: "Sara",
        lastName: "Lune",
        email: "sara.lune@email.com",
        dob: "28 Feb 2000",
        country: "Australia",
        state: "New South Wales",
        phone: "+61 400 000 004",
        profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
        status: "Restricted",
        progress: 60,
        warnings: 1,
        restrictionsCount: 1,
        restrictionDetails: "Fraudulent booking activity detected",
        tourRequests: [
            {
                id: "tr-004-a",
                title: "Great Barrier Reef Dive",
                bids: 4,
                type: "Eco Tour",
                dateRange: "Apr 5, 2026 — Apr 10, 2026",
                destination: "Queensland",
                persons: 2,
                budget: 5500,
                duration: "5 days",
                description: "Certified diving experience with underwater photography.",
                status: "Completed",
            },
        ],
        profileHistory: [
            {
                id: "ph-004-a",
                title: "Outback Explorer",
                dateRange: "Jul 12, 2025 — Jul 22, 2025",
                rating: 4,
                guideName: "Tom Bradley",
                review: "Tom was brilliant — knew every animal and plant in the outback.",
            },
        ],
        supportTickets: [
            {
                id: "st-004-a",
                date: "Mar 05, 2025",
                type: "Support",
                details: "Payment dispute on premium package",
                status: "Inprogress",
            },
            {
                id: "st-004-b",
                date: "Mar 10, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
        ],
    },
    {
        id: "005",
        name: "Omar Naji",
        rating: 0,
        firstName: "Omar",
        lastName: "Naji",
        email: "omar.naji@email.com",
        dob: "03 Sep 1990",
        country: "United Arab Emirates",
        state: "Dubai",
        phone: "+971 50 000 0005",
        profilePic: "https://randomuser.me/api/portraits/men/80.jpg",
        status: "Suspended",
        progress: 75,
        warnings: 4,
        restrictionsCount: 3,
        restrictionDetails: "Multiple payment disputes and Terms of Service violations",
        tourRequests: [
            {
                id: "tr-005-a",
                title: "Luxury Desert Safari",
                bids: 6,
                type: "Luxury",
                dateRange: "Nov 20, 2025 — Nov 25, 2025",
                destination: "Abu Dhabi",
                persons: 4,
                budget: 15000,
                duration: "5 days",
                description: "5-star glamping in the desert with camel rides and stargazing.",
                status: "Completed",
            },
            {
                id: "tr-005-b",
                title: "Cultural Istanbul Tour",
                bids: 2,
                type: "Cultural",
                dateRange: "Feb 10, 2026 — Feb 17, 2026",
                destination: "Istanbul",
                persons: 2,
                budget: 4200,
                duration: "7 days",
                description: "Historical sites, local food tours, and Bosphorus cruise.",
                status: "Active",
            },
        ],
        profileHistory: [
            {
                id: "ph-005-a",
                title: "Luxury Desert Safari",
                dateRange: "Nov 20, 2025 — Nov 25, 2025",
                rating: 5,
                guideName: "Khalid Al Mansoori",
                review: "Absolutely unforgettable. The best desert experience I have ever had.",
            },
        ],
        supportTickets: [
            {
                id: "st-005-a",
                date: "Jan 20, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Resolved",
            },
            {
                id: "st-005-b",
                date: "Feb 15, 2025",
                type: "Support",
                details: "Refund request on cancelled tour",
                status: "Inprogress",
            },
            {
                id: "st-005-c",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
        ],
    },
    {
        id: "006",
        name: "Alex Smith",
        rating: 0,
        firstName: "Alex",
        lastName: "Smith",
        email: "alex.smith@email.com",
        dob: "12 Mar 1992",
        country: "United States",
        state: "California",
        phone: "+1 (415) 000-0001",
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
        status: "Restricted",
        progress: 90,
        warnings: 2,
        restrictionsCount: 1,
        restrictionDetails: "Violated the privacy Policy of the platform",
        tourRequests: [
            {
                id: "tr-006-a",
                title: "Package Holiday for 2 week",
                bids: 3,
                type: "Package Holiday",
                dateRange: "Dec 26, 2025 — Jan 26, 2026",
                destination: "Destination",
                persons: 4,
                budget: 20000,
                duration: "10 mints",
                description: "Optional upload of an existing quote, image, or link where available",
                status: "Active",
            },
            {
                id: "tr-006-b",
                title: "Weekend City Break",
                bids: 1,
                type: "City Break",
                dateRange: "Mar 10, 2026 — Mar 12, 2026",
                destination: "New York",
                persons: 2,
                budget: 3500,
                duration: "2 days",
                description: "Looking for a guided city tour with hotel included.",
                status: "Completed",
            },
        ],
        profileHistory: [
            {
                id: "ph-006-a",
                title: "Package Holiday for 2 week",
                dateRange: "Dec 26, 2025 — Jan 25, 2026",
                rating: 4,
                guideName: "Sohail Khan",
                review: "Great to work with Sohail, He has guided through out the process.",
            },
            {
                id: "ph-006-b",
                title: "Package Holiday for 2 week",
                dateRange: "Dec 26, 2025 — Jan 25, 2026",
                rating: 3,
                guideName: "Lisa Haven",
                review: "Great to work with Sohail, He has guided through out the process.",
            },
        ],
        supportTickets: [
            {
                id: "st-006-a",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
            {
                id: "st-006-b",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Resolved",
            },
        ],
    },
    {
        id: "007",
        name: "Lisa Heaven",
        rating: 0,
        firstName: "Lisa",
        lastName: "Heaven",
        email: "lisa.heaven@email.com",
        dob: "05 Jul 1995",
        country: "United Kingdom",
        state: "London",
        phone: "+44 7700 900002",
        profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
        status: "Suspended",
        progress: 45,
        warnings: 3,
        restrictionsCount: 2,
        restrictionDetails: "Repeated harassment reports from other users",
        tourRequests: [
            {
                id: "tr-007-a",
                title: "Safari Adventure 10 Days",
                bids: 5,
                type: "Adventure",
                dateRange: "Jun 1, 2026 — Jun 10, 2026",
                destination: "Kenya",
                persons: 2,
                budget: 8000,
                duration: "10 days",
                description: "Looking for a fully guided safari experience with accommodation.",
                status: "Pending",
            },
        ],
        profileHistory: [
            {
                id: "ph-007-a",
                title: "European Road Trip",
                dateRange: "Aug 5, 2025 — Aug 20, 2025",
                rating: 5,
                guideName: "Marco Rossi",
                review: "Absolutely wonderful trip, Marco was very professional and knowledgeable.",
            },
            {
                id: "ph-007-b",
                title: "Island Hopping Greece",
                dateRange: "Sep 1, 2025 — Sep 14, 2025",
                rating: 4,
                guideName: "Elena Papadaki",
                review: "Loved every island. Would book again with Elena.",
            },
            {
                id: "ph-007-c",
                title: "Package Holiday for 2 week",
                dateRange: "Dec 26, 2025 — Jan 25, 2026",
                rating: 3,
                guideName: "Sohail Khan",
                review: "Great to work with Sohail, He has guided through out the process.",
            },
        ],
        supportTickets: [
            {
                id: "st-007-a",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
            {
                id: "st-007-b",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Resolved",
            },
            {
                id: "st-007-c",
                date: "Mar 01, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
        ],
    },
    {
        id: "008",
        name: "James Rook",
        rating: 0,
        firstName: "James",
        lastName: "Rook",
        email: "james.rook@email.com",
        dob: "19 Nov 1988",
        country: "Canada",
        state: "Ontario",
        phone: "+1 (647) 000-0003",
        profilePic: "https://randomuser.me/api/portraits/men/65.jpg",
        status: "Reinstate",
        progress: 12,
        warnings: 0,
        restrictionsCount: 0,
        restrictionDetails: "",
        tourRequests: [
            {
                id: "tr-008-a",
                title: "Ski Trip Rocky Mountains",
                bids: 2,
                type: "Adventure",
                dateRange: "Jan 15, 2026 — Jan 22, 2026",
                destination: "Banff, Canada",
                persons: 6,
                budget: 12000,
                duration: "7 days",
                description: "Family ski trip with equipment rental and ski instructor.",
                status: "Active",
            },
        ],
        profileHistory: [],
        supportTickets: [
            {
                id: "st-008-a",
                date: "Jan 10, 2025",
                type: "Support",
                details: "Account verification issue",
                status: "Resolved",
            },
        ],
    },
    {
        id: "009",
        name: "Sara Lune",
        rating: 0,
        firstName: "Sara",
        lastName: "Lune",
        email: "sara.lune@email.com",
        dob: "28 Feb 2000",
        country: "Australia",
        state: "New South Wales",
        phone: "+61 400 000 004",
        profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
        status: "Restricted",
        progress: 60,
        warnings: 1,
        restrictionsCount: 1,
        restrictionDetails: "Fraudulent booking activity detected",
        tourRequests: [
            {
                id: "tr-009-a",
                title: "Great Barrier Reef Dive",
                bids: 4,
                type: "Eco Tour",
                dateRange: "Apr 5, 2026 — Apr 10, 2026",
                destination: "Queensland",
                persons: 2,
                budget: 5500,
                duration: "5 days",
                description: "Certified diving experience with underwater photography.",
                status: "Completed",
            },
        ],
        profileHistory: [
            {
                id: "ph-009-a",
                title: "Outback Explorer",
                dateRange: "Jul 12, 2025 — Jul 22, 2025",
                rating: 4,
                guideName: "Tom Bradley",
                review: "Tom was brilliant — knew every animal and plant in the outback.",
            },
        ],
        supportTickets: [
            {
                id: "st-009-a",
                date: "Mar 05, 2025",
                type: "Support",
                details: "Payment dispute on premium package",
                status: "Inprogress",
            },
            {
                id: "st-009-b",
                date: "Mar 10, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
        ],
    },
    {
        id: "010",
        name: "Omar Naji",
        rating: 0,
        firstName: "Omar",
        lastName: "Naji",
        email: "omar.naji@email.com",
        dob: "03 Sep 1990",
        country: "United Arab Emirates",
        state: "Dubai",
        phone: "+971 50 000 0005",
        profilePic: "https://randomuser.me/api/portraits/men/80.jpg",
        status: "Suspended",
        progress: 75,
        warnings: 4,
        restrictionsCount: 3,
        restrictionDetails: "Multiple payment disputes and Terms of Service violations",
        tourRequests: [
            {
                id: "tr-010-a",
                title: "Luxury Desert Safari",
                bids: 6,
                type: "Luxury",
                dateRange: "Nov 20, 2025 — Nov 25, 2025",
                destination: "Abu Dhabi",
                persons: 4,
                budget: 15000,
                duration: "5 days",
                description: "5-star glamping in the desert with camel rides and stargazing.",
                status: "Completed",
            },
            {
                id: "tr-010-b",
                title: "Cultural Istanbul Tour",
                bids: 2,
                type: "Cultural",
                dateRange: "Feb 10, 2026 — Feb 17, 2026",
                destination: "Istanbul",
                persons: 2,
                budget: 4200,
                duration: "7 days",
                description: "Historical sites, local food tours, and Bosphorus cruise.",
                status: "Active",
            },
        ],
        profileHistory: [
            {
                id: "ph-010-a",
                title: "Luxury Desert Safari",
                dateRange: "Nov 20, 2025 — Nov 25, 2025",
                rating: 5,
                guideName: "Khalid Al Mansoori",
                review: "Absolutely unforgettable. The best desert experience I have ever had.",
            },
        ],
        supportTickets: [
            {
                id: "st-010-a",
                date: "Jan 20, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Resolved",
            },
            {
                id: "st-010-b",
                date: "Feb 15, 2025",
                type: "Support",
                details: "Refund request on cancelled tour",
                status: "Inprogress",
            },
            {
                id: "st-010-c",
                date: "Feb 26, 2025",
                type: "Support",
                details: "Starter Tier Monthly membership fees",
                status: "Inprogress",
            },
        ],
    },
];
