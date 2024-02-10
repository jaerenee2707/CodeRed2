function on() {
    console.log("L");
    
}

var tripType = "onewaytrip";
var apiKey = "";
var departAirport = "HEL";
var arrivalAirport = "OUL";
var desiredDate = "2024-05-20";
var numAdults = "1";
var numKids = "0"
var numBabies = "0";
var type = "Economy";
var currency = "USD";

function cycleKeys() {
    keyBank = ["65c7bdbf4bc0e34e403d752565c7bdbf4bc0e34e403d7525"];
    ran = Math.floor(Math.random() * 1);
    apiKey = keyBank[ran];
}

function fetchFlightInfo() {
    // Define the API URL
    cycleKeys();
    const apiUrl = "https://api.flightapi.io/" + tripType + "/" + apiKey + "/" + departAirport + "/" + arrivalAirport + "/" + desiredDate + "/" + numAdults + "/" + numKids + "/" + numBabies + "/" + type + "/" + currency;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Flight Info:", data);
        })
        .catch(error => {
            console.error("Error fetching flight info:", error);
        });
}


// "https://api.flightapi.io/onewaytrip/5f8b1ec2a9d31578961b4109f4dfd8/HEL/OUL/2024-05-20/1/0/0/Economy/USD"
