import styled from "styled-components";
import {
  Globe,
  MapLayout,
  GeojsonLayer,
  XYZTileLayer,
  LayerGroup,
} from "../lib";
import LeftSidebar from "./LeftSidebar";
import TopToolbar from "./TopToolbar";
import "./App.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #f2f2f2;
`;

const layer = new GeojsonLayer({
  id: "test",
  name: "Kansas City Point",
  data: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Kansas City",
        },
        geometry: {
          type: "Point",
          coordinates: [-94.566709, 39.08714],
        },
      },
    ],
  },
});
const tiles = new XYZTileLayer({
  id: "tiles",
  name: "OpenStreetMap Tiles",
  url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
  visible: false,
});

const folder = new LayerGroup({
  id: "root-folder",
  name: "Here's a folder",
  children: [layer, tiles],
});

const layers = [folder];

function App() {
  const handleGlobeMount = (viewer) => {
    console.log("viewer mounted", viewer);
  };

  return (
    <Container>
      <MapLayout leftSidebar={<LeftSidebar />} topToolbar={<TopToolbar />}>
        <Globe
          ionAccessToken={import.meta.env.VITE_ION_ACCESS_TOKEN}
          onMount={handleGlobeMount}
          initialPosition={{
            lon: -94.566709,
            lat: 39.08714,
            height: 10000,
            heading: 0,
            pitch: -90,
            roll: 0,
          }}
          layers={layers}
        />
      </MapLayout>
    </Container>
  );
}

export default App;
