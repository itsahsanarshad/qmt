import { consumers } from "@/data/userData";
import { SupportPageShell, FlatTicket } from "@/components/dashboard/admin/SupportPageShell";

const allTickets: FlatTicket[] = consumers.flatMap((c) =>
    c.supportTickets.map((t) => ({ ...t, consumer: c }))
);

export default function AgentSupportPage() {
    return <SupportPageShell tickets={allTickets} activeTab="In Progress" />;
}
