import {
  Cartesian2,
  Cartesian3,
  Cartographic,
  Ion,
  Math as CesiumMath,
  Terrain,
  Viewer,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import debounce from "../utils/debounce";
import Position from "../classes/Position";

const baseUrl = import.meta.env.BASE_URL || "";
window.CESIUM_BASE_URL = `${baseUrl}Cesium`;

Ion.defaultAccessToken = import.meta.env.VITE_ION_ACCESS_TOKEN;

const globeBundle = {
  name: "globe",

  getReducer: () => {
    const initialData = {
      viewer: null,
      initialPosition: null,
      currentPosition: null,
      previousPositions: [],
      forwardPositions: [],
      _positionFromCache: false,
      _shouldUpdatePosition: false,
    };

    return (state = initialData, { type, payload }) => {
      console.log(type, payload);
      switch (type) {
        case "GLOBE_INITIALIZED":
        case "GLOBE_UPDATE_POSITION_START":
        case "GLOBE_UPDATE_POSITION_FINISH":
        case "GLOBE_UPDATE_POSITION_ABORTED":
        case "GLOBE_FLY_PREVIOUS":
        case "GLOBE_FLY_PREVIOUS_ABORTED":
        case "GLOBE_FLY_FORWARD":
        case "GLOBE_FLY_FORWARD_ABORTED":
        case "GLOBE_HANDLE_MOVE_END":
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },

  selectGlobeViewer: (state) => state.globe.viewer,
  selectGlobeInitialPosition: (state) => state.globe.initialPosition,
  selectGlobeCurrentPosition: (state) => state.globe.currentPosition,
  selectGlobePositionFromCache: (state) => state.globe._positionFromCache,
  selectGlobePreviousPositions: (state) => state.globe.previousPositions,
  selectGlobeForwardPositions: (state) => state.globe.forwardPositions,
  selectGlobeCanFlyToPreviousPosition: (state) => {
    return !!state.globe.previousPositions.length;
  },
  selectGlobeCanFlyToForwardPosition: (state) => {
    return !!state.globe.forwardPositions.length;
  },
  selectGlobeCartographicCameraPosition: (state) => {
    const viewer = state.globe.viewer;
    if (!viewer) return null;
    const camera = viewer.camera;
    const pos = camera.position;
    const cartographic = Cartographic.fromCartesian(pos);
    const heading = camera.heading;
    const pitch = camera.pitch;
    const roll = camera.roll;
    const position = new Position({
      lon: CesiumMath.toDegrees(cartographic.longitude),
      lat: CesiumMath.toDegrees(cartographic.latitude),
      height: cartographic.height,
      heading: CesiumMath.toDegrees(heading),
      pitch: CesiumMath.toDegrees(pitch),
      roll: CesiumMath.toDegrees(roll),
    });
    return position;
  },

  /**
   * @function
   * @name doGlobeInitialize
   * @description Initialize the Cesium Viewer in a given DOM element
   * @param {Object} options
   * @param {HTMLElement} options.el
   * @param {Object} options.options - Cesium Viewer options, see https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
   * @param {Function} options.onMount
   * @param {Position} options.initialPosition
   * @returns undefined
   */
  doGlobeInitialize:
    ({ el, options, onMount, initialPosition }) =>
    ({ dispatch, store }) => {
      let viewer = store.selectGlobeViewer();
      if (viewer) return;

      const defaultOpts = {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        terrain: Terrain.fromWorldTerrain(),
      };

      const opts = { ...defaultOpts, ...options };

      viewer = new Viewer(el, opts);

      viewer?.camera.changed.addEventListener(
        debounce(store.doGlobeHandleMoveEnd, 800)
      );

      const home = new Position(initialPosition);

      dispatch({
        type: "GLOBE_INITIALIZED",
        payload: {
          viewer: viewer,
          initialPosition: home.isValid() ? home : null,
        },
      });

      window.setTimeout(store.doGlobeFlyToInitalPosition, 500);

      if (onMount && typeof onMount === "function") onMount(viewer);
    },

  doGlobeHandleMoveEnd:
    (e) =>
    ({ dispatch, store }) => {
      const positionFromCache = store.selectGlobePositionFromCache();
      // default to updating the position and cache
      let shouldUpdatePosition = true;
      // if the position was updated from the cache, don't update the cache
      if (positionFromCache) {
        shouldUpdatePosition = false;
      }
      dispatch({
        type: "GLOBE_HANDLE_MOVE_END",
        payload: {
          _positionFromCache: false,
          _shouldUpdatePosition: shouldUpdatePosition,
        },
      });
    },

  doGlobeUpdatePosition:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: "GLOBE_UPDATE_POSITION_START",
        payload: {
          _shouldUpdatePosition: false,
        },
      });
      const currentPosition = store.selectGlobeCurrentPosition();
      const previousPositions = store.selectGlobePreviousPositions();
      const viewer = store.selectGlobeViewer();
      if (!viewer) return;
      const camera = viewer.camera;
      const pos = camera.position;
      const cartographic = Cartographic.fromCartesian(pos);
      const heading = camera.heading;
      const pitch = camera.pitch;
      const roll = camera.roll;
      // create a new object with the position and orientation
      const position = new Position({
        lon: CesiumMath.toDegrees(cartographic.longitude),
        lat: CesiumMath.toDegrees(cartographic.latitude),
        height: cartographic.height,
        heading: CesiumMath.toDegrees(heading),
        pitch: CesiumMath.toDegrees(pitch),
        roll: CesiumMath.toDegrees(roll),
      });

      // previousPositions will contain the last 10 positions of the camera
      // if the length of previousPositions is greater than 10, remove the first element
      if (previousPositions.length > 10) {
        previousPositions.shift();
      }
      // add the new position to the end of the array
      if (currentPosition) previousPositions.push(currentPosition);

      // update the state with the new array
      dispatch({
        type: "GLOBE_UPDATE_POSITION_FINISH",
        payload: {
          currentPosition: position,
          previousPositions,
          forwardPositions: [],
        },
      });
    },

  doGlobeZoomIn:
    () =>
    ({ store }) => {
      const viewer = store.selectGlobeViewer();
      if (!viewer) return;
      const camera = viewer.camera;
      const position = camera.position;
      const cartographic = Cartographic.fromCartesian(position);
      const height = cartographic.height;
      const zoomAmount = Math.round(height * 0.15);
      camera.zoomIn(zoomAmount);
    },

  doGlobeZoomOut:
    () =>
    ({ store }) => {
      const viewer = store.selectGlobeViewer();
      if (!viewer) return;
      const camera = viewer.camera;
      const position = camera.position;
      const cartographic = Cartographic.fromCartesian(position);
      const height = cartographic.height;
      const zoomAmount = Math.round(height * 0.15);
      camera.zoomOut(zoomAmount);
    },

  doGlobeFlyTo:
    (position, duration = 1) =>
    ({ store }) => {
      const viewer = store.selectGlobeViewer();
      if (!viewer) return;
      if (!(position instanceof Position)) position = new Position(position);
      if (position.isValid()) {
        viewer.camera.flyTo({
          destination: Cartesian3.fromDegrees(
            position.lon,
            position.lat,
            position.height
          ),
          orientation: {
            heading: CesiumMath.toRadians(position.heading),
            pitch: CesiumMath.toRadians(position.pitch),
            roll: CesiumMath.toRadians(position.roll),
          },
          duration: duration,
        });
      } else {
        console.error("Invalid position in doGlobeFlyTo");
      }
    },

  doGlobeOrientNorth:
    () =>
    ({ store }) => {
      const viewer = store.selectGlobeViewer();
      if (!viewer) return;
      const cameraPosition = store.selectGlobeCartographicCameraPosition();
      const windowPosition = new Cartesian2(
        viewer.container.clientWidth / 2,
        viewer.container.clientHeight / 2
      );
      const pickRay = viewer.scene.camera.getPickRay(windowPosition);
      const pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
      // if we're not looking at earth, then bail
      console.log(pickPosition);
      if (!pickPosition) return;
      var pickPositionCartographic = Cartographic.fromCartesian(pickPosition);
      cameraPosition.lon = CesiumMath.toDegrees(
        pickPositionCartographic.longitude
      );
      cameraPosition.lat = CesiumMath.toDegrees(
        pickPositionCartographic.latitude
      );
      cameraPosition.heading = 0;
      cameraPosition.pitch = -90;
      cameraPosition.roll = 0;
      console.log(cameraPosition);
      store.doGlobeFlyTo(cameraPosition);
    },

  doGlobeFlyToInitalPosition:
    () =>
    ({ store }) => {
      const initialPosition = store.selectGlobeInitialPosition();
      if (initialPosition) {
        store.doGlobeFlyTo(initialPosition);
      }
    },

  doGlobeFlyToPreviousPosition:
    () =>
    ({ dispatch, store }) => {
      // bail if we don't have a viewer
      const viewer = store.selectGlobeViewer();
      if (!viewer) return;

      // any updates to the position should be ignored as if they are from cache
      dispatch({
        type: "GLOBE_FLY_PREVIOUS_START",
        payload: {
          _positionFromCache: true,
        },
      });

      // if we are currently moving, jump to the end of the flight
      viewer.camera.completeFlight();

      // get our position stuff from the store
      const currentPosition = store.selectGlobeCurrentPosition();
      const previousPositions = store.selectGlobePreviousPositions();
      const forwardPositions = store.selectGlobeForwardPositions();

      // grab the most recent position, removing it from the array
      const position = previousPositions.pop();
      if (!position)
        return dispatch({
          type: "GLOBE_FLY_PREVIOUS_ABORTED",
          payload: {},
        });

      // add the position to the forwardPositions array
      forwardPositions.push(currentPosition);

      // update the state with the new array
      dispatch({
        type: "GLOBE_FLY_PREVIOUS_FINISH",
        payload: {
          currentPosition: position,
          previousPositions: [...previousPositions],
          forwardPositions: [...forwardPositions],
        },
      });

      // fly to the position
      store.doGlobeFlyTo(position);
    },

  doGlobeFlyToForwardPosition:
    () =>
    ({ dispatch, store }) => {
      const viewer = store.selectGlobeViewer();
      if (!viewer) return;
      viewer.camera.completeFlight();
      const currentPosition = store.selectGlobeCurrentPosition();
      const previousPositions = store.selectGlobePreviousPositions();
      const forwardPositions = store.selectGlobeForwardPositions();

      // grab the most recent position, removing it from the array
      const position = forwardPositions.pop();
      if (!position)
        return dispatch({
          type: "GLOBE_FLY_FORWARD_ABORTED",
          payload: {},
        });

      // add the position to the previousPositions array
      previousPositions.push(currentPosition);

      // update the state with the new array
      dispatch({
        type: "GLOBE_FLY_FORWARD",
        payload: {
          _positionFromCache: true,
          currentPosition: position,
          previousPositions: [...previousPositions],
          forwardPositions: [...forwardPositions],
        },
      });

      // fly to the position
      store.doGlobeFlyTo(position);
    },

  reactGlobeShouldUpdatePosition: (state) => {
    if (state.globe._shouldUpdatePosition)
      return { actionCreator: "doGlobeUpdatePosition" };
  },
};

export default globeBundle;
