class MapboxGeocoder {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async search(query) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=ip&access_token=${this.accessToken}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
}

export default MapboxGeocoder;
export { MapboxGeocoder };
