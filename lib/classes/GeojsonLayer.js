import Layer from "./Layer";
import { GeoJsonDataSource } from "cesium";

class GeojsonLayer extends Layer {
  constructor({
    id,
    icon = null,
    name,
    data,
    options = {},
    viewer = null,
    visible = true,
    opacity = 1,
  }) {
    super({ id, icon, name, type: "geojson", viewer, visible, opacity });
    this.data = data;
    this.options = options;
    this.add();
  }

  add() {
    if (!this.viewer) return;
    const defaultOptions = {
      clampToGround: true,
    };
    const options = {
      ...defaultOptions,
      ...this.options,
    };
    this.viewer.dataSources
      .add(GeoJsonDataSource.load(this.data, options))
      .then((dataSource) => {
        this.layer = dataSource;
        this.layer.show = this.visible;
        this.setAdded();
      });
  }
}

export default GeojsonLayer;
export { GeojsonLayer };
