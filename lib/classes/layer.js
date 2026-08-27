class Layer {
  constructor({ id = "", name = "", source = "", map = null, visible = true }) {
    this.id = id;
    this.name = name;
    this.source = source;
    this.map = map;
    this.visible = visible;
    this.added = false;

    this.layer = null;
    this._mapListeners = [];
    this._overlays = [];
  }

  show() {
    this.layer.setVisible = true;
  }

  hide() {
    this.layer.setVisible = false;
  }

  _listen(type, listener) {
    this.map.on(type, listener);
    this._mapListeners.push({ listener, type });
  }

  _addOverlay(overlay) {
    this.map.addOverlay(overlay);
    this._overlays.push(overlay);
  }

  _remove() {
    if (!this.map) return;

    this._mapListeners.forEach(({ listener, type }) => {
      this.map.un(type, listener);
    });
    this._mapListeners = [];

    this._overlays.forEach((overlay) => this.map.removeOverlay(overlay));
    this._overlays = [];

    if (this.layer) this.map.removeLayer(this.layer);
    this.layer = null;
    this.added = false;
  }

  _setAdded() {
    this.added = true;
  }
}

export default Layer;
export { Layer };
