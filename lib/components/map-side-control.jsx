import PropTypes from "prop-types";

function MapSideControl({
    buttonLabel = "Layers",
    children,
    isOpen,
    onToggle,
    side = "right",
    title = "Map controls",
    top = 12,
    zIndex = 120,
}) {
    const containerStyle = {
        alignItems: "flex-start",
        display: "flex",
        gap: "0.5rem",
        height: `calc(100% - ${top + 12}px)`,
        position: "absolute",
        top,
        zIndex,
        ...(side === "left" ? { left: 12 } : { right: 12 }),
    };
    const buttonStyle = {
        background: "#fff",
        border: "1px solid #d1d5db",
        borderRadius: 4,
        boxShadow: "0 1px 4px rgba(15, 23, 42, 0.18)",
        color: "#1f2937",
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1.2,
        padding: "0.55rem 0.75rem",
    };
    const panelStyle = {
        background: "#fff",
        border: "1px solid #d1d5db",
        borderRadius: 4,
        boxShadow: "0 12px 28px rgba(15, 23, 42, 0.22)",
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
        overflow: "hidden",
        width: "min(20rem, calc(100vw - 2rem))",
    };
    const headerStyle = {
        alignItems: "center",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        gap: "0.5rem",
        justifyContent: "space-between",
        padding: "0.5rem 0.75rem",
    };
    const bodyStyle = {
        flex: "1 1 auto",
        minHeight: 0,
        overflowY: "auto",
        overscrollBehavior: "contain",
        padding: "0.75rem",
    };

    return (
        <div style={containerStyle}>
            {side === "right" && (
                <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={onToggle}
                    style={buttonStyle}
                >
                    {buttonLabel}
                </button>
            )}
            {isOpen && (
                <section
                    aria-label={title}
                    style={panelStyle}
                >
                    <div style={headerStyle}>
                        <h2 style={{ color: "#111827", fontSize: 14, fontWeight: 700 }}>
                            {title}
                        </h2>
                        <button
                            type="button"
                            onClick={onToggle}
                            style={{
                                ...buttonStyle,
                                boxShadow: "none",
                                fontSize: 12,
                                padding: "0.25rem 0.5rem",
                            }}
                        >
                            Close
                        </button>
                    </div>
                    <div style={bodyStyle}>
                        {children}
                    </div>
                </section>
            )}
            {side === "left" && (
                <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={onToggle}
                    style={buttonStyle}
                >
                    {buttonLabel}
                </button>
            )}
        </div>
    );
}

MapSideControl.propTypes = {
    buttonLabel: PropTypes.node,
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func,
    side: PropTypes.oneOf(["left", "right"]),
    title: PropTypes.node,
    top: PropTypes.number,
    zIndex: PropTypes.number,
};

export default MapSideControl;
export { MapSideControl };
