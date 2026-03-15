import { consumers } from "@/data/userData";
import { ConsumerPageShell } from "@/components/dashboard/admin/ConsumerPageShell";

const heldConsumers = consumers.filter(
    (c) => c.status === "Restricted" || c.status === "Suspended"
);

export default function AdminConsumerHoldPage() {
    return <ConsumerPageShell consumers={heldConsumers} title="Consumer Hold" variant="hold" />;
}
