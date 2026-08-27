import { describe, expect, it, vi } from "vitest";

import layersBundle from "./layers-bundle";

describe("layers bundle", () => {
    it("removes prior layer resources before initializing replacements", () => {
        const previous = { _remove: vi.fn() };
        const next = { _add: vi.fn(), id: "status" };
        const map = {};
        const dispatch = vi.fn();
        const store = {
            selectLayersByMapId: () => ({ map: [previous] }),
            selectMaps: () => ({ map }),
        };

        layersBundle.doLayersInitialize([next], "map")({ dispatch, store });

        expect(previous._remove).toHaveBeenCalledOnce();
        expect(next.map).toBe(map);
        expect(next._add).toHaveBeenCalledOnce();
        expect(dispatch).toHaveBeenCalledWith({
            type: "LAYERS_INITIALIZED",
            payload: {
                layers: [next],
                layersByMapId: { map: [next] },
            },
        });
    });
});
