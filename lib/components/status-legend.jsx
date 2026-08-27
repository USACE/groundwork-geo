import { DEFAULT_STATUS_COLORS } from "../styles/status-marker-style";

const DEFAULT_STATUS_LEGEND_ITEMS = [
    { color: DEFAULT_STATUS_COLORS[7], label: "150%+" },
    { color: DEFAULT_STATUS_COLORS[6], label: "125%" },
    { color: DEFAULT_STATUS_COLORS[5], label: "100%" },
    { color: DEFAULT_STATUS_COLORS[4], label: "75%" },
    { color: DEFAULT_STATUS_COLORS[3], label: "50%" },
    { color: DEFAULT_STATUS_COLORS[2], label: "25%" },
    { color: DEFAULT_STATUS_COLORS[1], label: "10%" },
    { color: DEFAULT_STATUS_COLORS[0], label: "0%+" },
    { color: "rgba(255,255,255,0)", label: "No regulating value" },
    { color: "#d1d5db", label: "No data" },
];

function StatusLegend({ title = "Status", items = DEFAULT_STATUS_LEGEND_ITEMS }) {
    return (
        <div>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{title}</div>
            <div style={{ display: "grid", gap: "0.35rem" }}>
                {items.map((item) => (
                    <div
                        key={`${item.label}-${item.color}`}
                        style={{
                            alignItems: "center",
                            display: "grid",
                            gap: "0.5rem",
                            gridTemplateColumns: "1.25rem 1fr",
                        }}
                    >
                        <span
                            aria-hidden="true"
                            style={{
                                background: item.color,
                                border: "1px solid #4b5563",
                                display: "inline-block",
                                height: "0.75rem",
                                width: "1.25rem",
                            }}
                        />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { DEFAULT_STATUS_LEGEND_ITEMS, StatusLegend };
export default StatusLegend;
