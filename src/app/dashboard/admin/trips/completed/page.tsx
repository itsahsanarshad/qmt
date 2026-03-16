import { consumers } from "@/data/userData";
import { TripPageShell, FlatTrip } from "@/components/dashboard/admin/TripPageShell";

const completedTrips: FlatTrip[] = consumers.flatMap((c) =>
    c.tourRequests
        .filter((t) => t.status === "Completed")
        .map((t) => ({ ...t, consumer: c }))
);

export default function CompletedTripsPage() {
    return <TripPageShell trips={completedTrips} activeTab="Completed Trips" />;
}
