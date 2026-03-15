export type StatusOption = "Reinstate" | "Suspended" | "Restricted";

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
    },
];
