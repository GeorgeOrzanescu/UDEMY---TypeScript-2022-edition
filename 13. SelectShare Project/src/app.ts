import axios from "axios";

// Getting user input

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";
declare var google: any; // let TS know that google exists

form.addEventListener("submit", searchAddressHandler);

type GoogleGeocodingResponse = {
  // create a custom type for the response
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status:
    | "OK"
    | "ZERO_RESULTS"
    | "INVALID_REQUEST"
    | "OVER_QUERY_LIMIT"
    | "REQUEST_DENIED"
    | "UNKNOWN_ERROR";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send request to google api
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordonates = response.data.results[0].geometry.location;
      const map = new google.map.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordonates,
          zoom: 16,
        }
      );
      new google.map.Marker({ position: coordonates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}
form.addEventListener("submit", searchAddressHandler);
