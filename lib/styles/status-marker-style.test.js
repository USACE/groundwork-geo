import { describe, expect, it } from "vitest";

import {
    DEFAULT_STATUS_COLORS,
    getThresholdStatus,
    statusColor,
} from "./status-marker-style";

describe("status marker thresholds", () => {
    it("places values into the expected status buckets", () => {
        expect(getThresholdStatus(null)).toBe("missing");
        expect(getThresholdStatus("not-a-number")).toBe("missing");
        expect(getThresholdStatus(9.9)).toBe(0);
        expect(getThresholdStatus(10)).toBe(1);
        expect(getThresholdStatus(150)).toBe(7);
    });

    it("resolves special and numeric status colors", () => {
        expect(statusColor("missing")).toBe("#d1d5db");
        expect(statusColor("transparent")).toBe("rgba(255,255,255,0)");
        expect(statusColor(2)).toBe(DEFAULT_STATUS_COLORS[2]);
    });
});
