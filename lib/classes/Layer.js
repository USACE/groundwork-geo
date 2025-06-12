class Layer {
    constructor({
        id = "",
        name = "",
        source = "",
        map = null,
        visible = true,
    }) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.map = map;
        this.visible = visible;
        this.added = false;

        this.layer = null;
    }

    show() {
        this.layer.setVisible = true
    }

    hide() {
        this.layer.setVisible = false
    }

    _setAdded() {
        this.added = true
    }
}

export default Layer;
export { Layer }