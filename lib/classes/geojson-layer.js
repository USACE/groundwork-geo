import Layer from "./layer"
import EsriJSON from 'ol/format/EsriJSON.js';
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { createXYZ } from 'ol/tilegrid.js';
import { tile as tileStrategy } from 'ol/loadingstrategy.js';


import defaultStyles from "../defaultStyles";

class GeoJSONLayer extends Layer {
    constructor({
        id,
        name,
        source,
        style,
        map = null,
        type = 'geojson',
        visible = true,
        onClick
    }) {
        super({ id, name, source, map, visible });
        this.style = style
        this.type = type
        this.onClick = onClick
        this._add();
    }

    _add() {
        if (!this.map) return;
        if (!this.style) {
            this.style = defaultStyles
        }
        // establishing OL vector layer format
        if (this.type === 'geojson') {
            // if url, load remote data
            if (typeof (this.source) === 'string' && this.source.includes('http')) {
                this.layer = new VectorLayer({
                    source: new VectorSource({
                        url: this.source,
                        format: new GeoJSON()
                    }),
                    style: this.visible ? this.style : null
                })
                this.layer.show = this.visible;

            } else {
                // load local file
                this.layer = new VectorLayer({
                    source: new VectorSource({
                        features: new GeoJSON().readFeatures(this.source, {
                            featureProjection: 'EPSG:3857'
                        })

                    }),
                    style: this.visible ? this.style : null
                })
                this.layer.show = this.visible;
            }
        } else if (this.type === 'esrijson') {
            // load esriJSON
            // @TODO does every esri link look the same? 
            let esriSource = this.source
            this.layer = new VectorLayer({
                source: new VectorSource({
                    url: function (extent, resolution, projection) {
                        // ArcGIS Server only wants the numeric portion of the projection ID.
                        const srid = projection
                            .getCode()
                            .split(/:(?=\d+$)/)
                            .pop();
                        const url = esriSource +
                            '/query/?f=json&' +
                            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
                            encodeURIComponent(
                                '{"xmin":' +
                                extent[0] +
                                ',"ymin":' +
                                extent[1] +
                                ',"xmax":' +
                                extent[2] +
                                ',"ymax":' +
                                extent[3] +
                                ',"spatialReference":{"wkid":' +
                                srid +
                                '}}',
                            ) +
                            '&geometryType=esriGeometryEnvelope&inSR=' +
                            srid +
                            '&outFields=*' +
                            '&outSR=' +
                            srid;

                        return url;
                    },
                    strategy: tileStrategy(
                        createXYZ({
                            tileSize: 512,
                        }),
                    ),
                    format: new EsriJSON(),
                }),
                style: this.visible ? this.style : null
            })
            this.layer.show = this.visible;
        }

        if (typeof this.onClick === 'function') {
            this.map.on('click', (e) => {
                this.layer.getFeatures(e.pixel).then((features) => {
                    const feature = features.length ? features[0] : undefined;
                    if (!feature) return;
                    this.onClick(feature, e.coordinate)({ store });
                });
            });
        }


        // calling OL map add layer function
        this.map.addLayer(this.layer)

        this._setAdded = true
    }
}

export default GeoJSONLayer;
export { GeoJSONLayer };