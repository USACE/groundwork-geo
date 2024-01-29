class Position {
  constructor({
    lon,
    lat,
    height = 10000,
    heading = 0,
    pitch = -90,
    roll = 0,
  }) {
    this.lon = lon;
    this.lat = lat;
    this.height = height;
    this.heading = heading;
    this.pitch = pitch;
    this.roll = roll;
  }

  isValid() {
    let valid = true;
    let msg = "";
    if (isNaN(this.lon)) {
      valid = false;
      msg += "lon is NaN\n";
    }
    if (this.lon > 180 || this.lon < -180) {
      valid = false;
      msg += "lon is out of range\n";
    }
    if (isNaN(this.lat)) {
      valid = false;
      msg += "lat is NaN\n";
    }
    if (this.lat > 90 || this.lat < -90) {
      valid = false;
      msg += "lat is out of range\n";
    }
    if (isNaN(this.height)) {
      valid = false;
      msg += "height is NaN\n";
    }
    if (this.height < 0) {
      valid = false;
      msg += "height is out of range\n";
    }
    if (isNaN(this.heading)) {
      valid = false;
      msg += "heading is NaN\n";
    }
    if (this.heading > 360 || this.heading < 0) {
      valid = false;
      msg += "heading is out of range\n";
    }
    if (isNaN(this.pitch)) {
      valid = false;
      msg += "pitch is NaN\n";
    }
    if (this.pitch > 90 || this.pitch < -90) {
      valid = false;
      msg += "pitch is out of range\n";
    }
    if (isNaN(this.roll)) {
      valid = false;
      msg += "roll is NaN\n";
    }
    if (this.roll > 360 || this.roll < -360) {
      valid = false;
      msg += "roll is out of range\n";
    }
    if (!valid) console.error(msg);
    return valid;
  }
}

export default Position;
export { Position };
