import { consumers } from "@/data/userData";
import { TripPageShell, FlatTrip } from "@/components/dashboard/admin/TripPageShell";

const activeTrips: FlatTrip[] = consumers.flatMap((c) =>
    c.tourRequests
        .filter((t) => t.status === "Active")
        .map((t) => ({ ...t, consumer: c }))
);

export default function ActiveTripsPage() {
    return <TripPageShell trips={activeTrips} activeTab="Active Trips" />;
}
