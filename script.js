function on() {
    console.log("L");
}

var tripType = "onewaytrip";
var apiKey = "65c7bdbf4bc0e34e403d7525";
//var departAirport = "HEL";
//var arrivalAirport = "OUL";
//var desiredDate = "2024-05-20";
var numAdults = "1";
var numKids = "0"
var numBabies = "0";
var type = "Economy";
// var currency = "USD";
var output = "";
//function cycleKeys() {
  //  keyBank = ["65c7bdbf4bc0e34e403d752565c7bdbf4bc0e34e403d7525"];
   // ran = Math.floor(Math.random() * 1);
    //apiKey = keyBank[ran];
//}

function fetchFlightInfo() {

    var inputDepartureAirport = document.getElementById('departureAirport').value;
    var inputArrivalAirport = document.getElementById('arrivalAirport').value;
    var inputDate = document.getElementById('Date').value;


    var inputCurrency = document.getElementById('currency').value;

    document.getElementById('departureAirportDisplay').innerText = "Currency: " + inputDate;


    // Define the API URL
    //cycleKeys();
    const apiUrl = "https://api.flightapi.io/" + tripType + "/" + apiKey + "/" + inputDepartureAirport + "/" + inputArrivalAirport + "/" + inputDate + "/" + numAdults + "/" + numKids + "/" + numBabies + "/" + type + "/" + inputCurrency;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Flight Info:", data);
            output = data;
        })
        .catch(error => {
            console.error("Error fetching flight info:", error);
        });
}







// "https://api.flightapi.io/onewaytrip/5f8b1ec2a9d31578961b4109f4dfd8/HEL/OUL/2024-05-20/1/0/0/Economy/USD"

    // itineraries.pricing_options.price.amount
function printAgain() {
    const priceAmount = output.itineraries[0].pricing_options[0].price.amount;

    console.log("Price Amount:", priceAmount);
}

