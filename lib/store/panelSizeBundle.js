const panelSizeBundle = {
  name: "panelSize",

  getReducer: () => {
    const initialData = {
      width: 350,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "PANEL_SIZE_SET_WIDTH":
          return {
            ...state,
            ...payload,
          };
        default:
          return state;
      }
    };
  },

  selectPanelSizeWidth: (state) => state.panelSize.width,

  doPanelSizeSetWidth:
    (width) =>
    ({ dispatch }) => {
      dispatch({
        type: "PANEL_SIZE_SET_WIDTH",
        payload: { width },
      });
    },
};

export default panelSizeBundle;
