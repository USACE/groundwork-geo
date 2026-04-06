# Groundwork Geo

`@usace/groundwork-geo` is the mapping library for the broader Groundwork ecosystem.

This package is focused on map rendering, layer management, and mapping-oriented UI primitives for React applications. It is intended to be consumed alongside Groundwork and related USACE component libraries, not as a standalone documentation site. Over time, the primary documentation exists within [Groundwork](https://github.com/usace/groundwork) proper, while this repository remains the source for the reusable mapping package itself.

## Relationship To Groundwork

Groundwork provides the broader foundation of React components for USACE applications:

- Groundwork: https://github.com/USACE/groundwork
- Groundwork Water: https://github.com/USACE-WaterManagement/groundwork-water

`groundwork-geo` fits into that ecosystem as the map-focused sub-library:

- OpenLayers-based map components
- Layer classes for common source types
- Layout and toolbar primitives for map applications
- Reusable mapping tools such as a basemap picker and layer tree
- And more to come!

## Installation

Install from npm:

```bash
npm install @usace/groundwork-geo
```

Package page:

- https://www.npmjs.com/package/@usace/groundwork-geo

This package is built with:

- React
- OpenLayers (`ol`)
- `styled-components`
- `redux-bundler`

## Documentation

This repository is the home for the reusable mapping package. End-user documentation is expected to live with the broader Groundwork documentation over time rather than in a standalone docs site here.

## Basic Usage

At a high level, applications wrap mapping content in `MapLayout`, then render a `Map` instance with one or more layer definitions.

```jsx
import {
  Map,
  MapLayout,
  Toolbar,
  TileLayer,
  ArcGISTileLayer,
  BasemapPicker,
  LayerTree,
  cobalt,
} from "@usace/groundwork-geo";

const layers = [
  new TileLayer({
    id: "tiles",
    name: "Base Tiles",
    source: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  }),
  new ArcGISTileLayer({
    id: "imagery",
    name: "Imagery",
    source:
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
  }),
];

export default function App() {
  return (
    <MapLayout
      theme={cobalt}
      rightToolbar={<Toolbar tools={[BasemapPicker, LayerTree]} />}
      leftSidebar={null}
    >
      <Map
        mapId="main"
        layers={layers}
        viewConfig={{
          center: [-96, 39],
          zoom: 4,
        }}
      />
    </MapLayout>
  );
}
```

## Current State

This repository is an actively evolving package. A few implementation details are still rough around the edges, and the demo app is currently minimal. Treat this repository as the source of the mapping primitives, while user-facing documentation and examples are expected to align with the main Groundwork documentation over time.

## Contributing

Contributions are welcome from teams building with Groundwork across USACE. For repository layout, local development, and contribution workflow details, see [CONTRIBUTING.md](./CONTRIBUTING.md).
