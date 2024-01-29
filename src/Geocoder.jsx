import { useEffect, useState } from "react";
import { Search, MapboxGeocoder, useGroundworkGeo } from "../lib";
const mbToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const geocoder = new MapboxGeocoder(mbToken);

export default function Geocoder() {
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState([]);
  const { flyTo } = useGroundworkGeo();

  const handleChange = (value) => {
    setSearchString(value);
  };

  useEffect(() => {
    if (searchString.length > 2) {
      geocoder.search(searchString).then((featureCollection) => {
        setResults(featureCollection?.features);
      });
    } else {
      setResults([]);
    }
  }, [searchString]);

  const handleClear = () => {
    setSearchString("");
    setResults([]);
  };

  const handleSelect = (value) => {
    flyTo({ lat: value.center[1], lon: value.center[0] });
    setSearchString("");
    setResults([]);
  };

  return (
    <Search
      onChange={handleChange}
      onClear={handleClear}
      onSelect={handleSelect}
      value={searchString}
      results={results}
    />
  );
}
