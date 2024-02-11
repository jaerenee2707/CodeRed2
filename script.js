function on() {
    console.log("L");
}

var tripType = "onewaytrip";
var apiKey = "65c87948f47f616e93efde95";
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



    // Define the API URL
    //cycleKeys();
    const apiUrl = "https://api.flightapi.io/" + tripType + "/" + apiKey + "/" + inputDepartureAirport + "/" + inputArrivalAirport + "/" + inputDate + "/" + numAdults + "/" + numKids + "/" + numBabies + "/" + type + "/" + inputCurrency;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Flight Info:", data);
            output = data;
            printAgain()
        })
        .catch(error => {
            console.error("Error fetching flight info:", error);
        });
}







// "https://api.flightapi.io/onewaytrip/65c87948f47f616e93efde95/HEL/OUL/2024-05-20/1/0/0/Economy/USD"

// itineraries.pricing_options.price.amount
function printAgain() {
    var inputDepartureAirport = document.getElementById('departureAirport').value;
    var inputArrivalAirport = document.getElementById('arrivalAirport').value;
    var inputCurrency = document.getElementById('currency').value;

    // Assuming output is retrieved from the flight API
    // Assuming output.itineraries is an array
    if (output && output.itineraries && output.itineraries.length > 0) {
        const itinerary = output.itineraries[0]; // Taking the first itinerary for simplicity
        const legId = itinerary.leg_ids[0]; // Assuming only one leg for simplicity
        const leg = output.legs.find(leg => leg.id === legId);
        const segmentId = leg.segment_ids[0]; // Assuming only one segment for simplicity
        const segment = output.segments.find(segment => segment.id === segmentId);

        const priceAmount = itinerary.pricing_options[0].price.amount;
        const departureTime = new Date(segment.departure);
        const arrivalTime = new Date(segment.arrival);
        const flightDuration = segment.duration;
        const operatingCarrierId = segment.operating_carrier_id;

        // Function to get airline name by operating carrier ID
        function getAirlineNameByOperatingCarrierId(operatingCarrierId) {
            // Find the carrier with the matching operating carrier ID
            const carrier = output.carriers.find(carrier => carrier.id === operatingCarrierId);
            // Return the airline name if the carrier is found, otherwise return "Unknown Airline"
            return carrier ? carrier.name : "Unknown Airline";
        }

        const airline = getAirlineNameByOperatingCarrierId(operatingCarrierId);

        console.log("Price Amount:", priceAmount);
        console.log("Departure Time:", departureTime);
        console.log("Arrival Time:", arrivalTime);
        console.log("Flight Duration:", flightDuration);
        console.log("Airline:", airline);

        document.getElementById('priceDisplay').classList.add('output-text');

        // Formatting the output text
        var outputText = `
        The current cheapest flight from ${inputDepartureAirport} to ${inputArrivalAirport} is ${priceAmount} ${inputCurrency}
        Departure Time:                  ${departureTime.toLocaleString()}
        Arrival Time:                    ${arrivalTime.toLocaleString()}
        Duration:                        ${flightDuration} minutes
        Airline:                         ${airline}`;

        // Set the formatted text to the element
        document.getElementById('priceDisplay').innerText = outputText;

    } else {
        console.error("Error: Unable to retrieve flight information.");
        document.getElementById('priceDisplay').innerText = "Unable to retrieve flight information. Please re-submit form."
        // Display an error message to the user or handle the error appropriately   
    }
    
}

var btnDown = document.getElementById("downButton");
btnDown.onclick = scrollDown()

var arrDown = document.getElementById("downArrow");
arrDown.onclick = scrollDown()

function scrollDown() {
    window.scroll(0, window.scrollY + 1000);
    console.log("click")
}

//Header scroll
//window.onscroll = function () { myFunction() };

// Get the header
//var header = document.getElementById("header");

// Get the offset position of the navbar
//var sticky = header.offsetTop;

//// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
//function myFunction() {
//    if (window.pageYOffset > sticky) {
//        header.classList.add("sticky");
//    } else {
//        header.classList.remove("sticky");
//    }
// }

