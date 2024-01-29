class LayerGroup {
  constructor({
    id,
    name,
    children = [],
    visible = true,
    expanded = true,
    toggleable = false,
  }) {
    this.id = id;
    this.name = name;
    this.children = children;
    this.visible = visible;
    this.expanded = expanded;
    this.toggleable = toggleable;
  }

  add(layer) {
    this.children.push(layer);
  }

  remove(layer) {
    this.children = this.children.filter((child) => child.id !== layer.id);
  }

  show() {
    this.children.forEach((child) => child.show());
    this.visible = true;
  }

  hide() {
    this.children.forEach((child) => child.hide());
    this.visible = false;
  }

  toggle() {
    this.children.forEach((child) => child.toggle());
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}

export default LayerGroup;
export { LayerGroup };
