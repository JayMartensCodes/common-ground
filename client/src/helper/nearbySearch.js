import axios from "axios";

const nearbySearch = async (geoLocation, radius, type) => {
  const lat = geoLocation.lat;
  const lng = geoLocation.lng;
  const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await axios.get(url);
    const results = response.data.results;
    return results;
  } catch (error) {
    console.log({ error: error });
  }
};

export default nearbySearch;
