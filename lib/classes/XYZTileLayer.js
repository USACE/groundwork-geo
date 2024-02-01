import Layer from "./Layer";
import { UrlTemplateImageryProvider } from "cesium";

class XYZTileLayer extends Layer {
  constructor({
    id,
    icon,
    name,
    url,
    options = {},
    viewer = null,
    visible = true,
    opacity = 1,
  }) {
    super({ id, icon, name, type: "xyz", viewer, visible, opacity });
    this.url = url;
    this.options = options;
    this._add();
  }

  _add() {
    if (!this.viewer) return;
    const defaultOptions = {
      url: this.url,
      maximumLevel: 18,
    };
    const options = {
      ...defaultOptions,
      ...this.options,
    };
    this.layer = this.viewer.imageryLayers.addImageryProvider(
      new UrlTemplateImageryProvider(options)
    );
    if (!this.visible) {
      this.layer.show = false;
    }
    this._setAdded();
  }
}

export default XYZTileLayer;
export { XYZTileLayer };
