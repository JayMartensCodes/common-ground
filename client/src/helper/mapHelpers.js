export function getMidPoint(location1, location2) {
  let lat1 = location1.lat;
  let lng1 = location1.lng;

  let lat2 = location2.lat;
  let lng2 = location2.lng;

  //-- Define radius function
  if (typeof Number.prototype.toRad === "undefined") {
    // eslint-disable-next-line no-extend-native
    Number.prototype.toRad = function () {
      return (this * Math.PI) / 180;
    };
  }

  //-- Define degrees function
  if (typeof Number.prototype.toDeg === "undefined") {
    // eslint-disable-next-line no-extend-native
    Number.prototype.toDeg = function () {
      return this * (180 / Math.PI);
    };
  }
  //get longitude difference
  const diffLong = (lng2 - lng1).toRad();

  //convert to radians
  lat1 = lat1.toRad();
  lat2 = lat2.toRad();
  lng1 = lng1.toRad();

  const bX = Math.cos(lat2) * Math.cos(diffLong);
  const bY = Math.cos(lat2) * Math.sin(diffLong);
  const lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY)
  );
  const lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

  //-- Return result
  return { lat: lat3.toDeg(), lng: lng3.toDeg() };
}
