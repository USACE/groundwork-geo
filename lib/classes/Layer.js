class Layer {
  constructor({
    icon = null,
    id,
    name,
    opacity = 1,
    toggleable = true,
    type,
    viewer = null,
    visible = true,
  }) {
    this.icon = icon;
    this.id = id;
    this.name = name;
    this.opacity = opacity;
    this.toggleable = toggleable;
    this.type = type;
    this.viewer = viewer;
    this.visible = visible;
    this.added = false;

    this.layer = null;
  }

  show() {
    this.layer.show = true;
  }

  hide() {
    this.layer.show = false;
  }

  toggle(cb) {
    this.layer.show = !this.layer.show;
    if (cb && typeof cb === "function") {
      cb(this.layer.show);
    }
  }

  setAdded() {
    this.added = true;
  }
}

export default Layer;
export { Layer };
