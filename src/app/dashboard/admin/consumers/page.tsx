const StarRating = ({ filled = 2 }: { filled?: number }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24"
                fill={i <= filled ? "#f59e0b" : "none"}
                stroke={i <= filled ? "#f59e0b" : "#d1d5db"}
                strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ))}
    </div>
);

const mockConsumers = [
    { id: "001", name: "Alex Smith", rating: 2 },
    { id: "002", name: "Lisa Heaven", rating: 2 },
    { id: "003", name: "Alex Smith", rating: 3 },
    { id: "004", name: "Lisa Heaven", rating: 2 },
];

export default function AdminPage() {
    return (
        <div>
            <h2 className="text-sm font-semibold text-[var(--qmt-text)] mb-4">
                Consumer List
            </h2>

            {/* Card — horizontal scroll on small screens */}
            <div className="bg-white rounded-xl border border-[var(--qmt-border)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                        <thead>
                            <tr className="bg-[#fafbfc] border-b border-[var(--qmt-border)]">
                                {["User ID", "Name", "Account Details", "Tour request", "Profile History", "Support"].map((col) => (
                                    <th key={col} className="text-left px-5 py-3 text-xs font-medium text-[var(--qmt-text-muted)] whitespace-nowrap">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {mockConsumers.map((consumer, index) => (
                                <tr
                                    key={consumer.id}
                                    className={`transition-colors hover:bg-gray-50 ${index < mockConsumers.length - 1 ? "border-b border-[var(--qmt-border)]" : ""}`}
                                >
                                    <td className="px-5 py-3.5 text-[12.5px] text-[var(--qmt-text-muted)]">{consumer.id}</td>
                                    <td className="px-5 py-3.5 text-[12.5px] font-medium text-[var(--qmt-text)]">{consumer.name}</td>
                                    <td className="px-5 py-3.5"><StarRating filled={consumer.rating} /></td>
                                    <td className="px-5 py-3.5" />
                                    <td className="px-5 py-3.5" />
                                    <td className="px-5 py-3.5" />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
