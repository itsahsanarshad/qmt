import { consumers } from "@/data/userData";
import { ConsumerPageShell } from "@/components/dashboard/admin/ConsumerPageShell";

export default function AdminConsumersPage() {
    return <ConsumerPageShell consumers={consumers} title="Consumer List" variant="list" />;
}
