function on() {
    console.log("L");
}

var tripType = "onewaytrip";
var apiKey = "65c8f121ce31477d629dbb5b"
//var apiKey = "65c87948f47f616e93efde95";
//var departAirport = "HEL";
//var arrivalAirport = "OUL";
//var desiredDate = "2024-05-20";
var numAdults = "1";
var numKids = "0"
var numBabies = "0";
//var type = "Economy";
// var currency = "USD";
var output = "";

//function cycleKeys() {
//  keyBank = ["65c7bdbf4bc0e34e403d752565c7bdbf4bc0e34e403d7525"];
// ran = Math.floor(Math.random() * 1);
//apiKey = keyBank[ran];
//}

function fetchFlightInfo() {

    showLoadingGif();

    var inputClassType = document.getElementById('classType').value;
    var inputDepartureAirport = document.getElementById('departureAirport').value;
    var inputArrivalAirport = document.getElementById('arrivalAirport').value;
    var inputDate = document.getElementById('Date').value;
    var inputCurrency = document.getElementById('currency').value;

   if (!inputDepartureAirport) {
        console.error("Missing input data. Please fill in all fields.");
        document.getElementById('priceDisplay').innerText = "Missing input data. Please fill in all fields.";
        return; // Stop further execution
    }
        
    if (inputDepartureAirport ==  inputArrivalAirport)
    {console.error("SAME INFORMATION");
    document.getElementById('priceDisplay').innerText = "SAME INFORMATION";
        return; }

    const apiUrl = "https://api.flightapi.io/" + tripType + "/" + apiKey + "/" + inputDepartureAirport + "/" + inputArrivalAirport + "/" + inputDate + "/" + numAdults + "/" + numKids + "/" + numBabies + "/" + inputClassType + "/" + inputCurrency;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Flight Info:", data);
            output = data;
            printAgain()
            hideLoadingGif();
        })
        .catch(error => {
            console.error("Error fetching flight info:", error);
            hideLoadingGif();
        });
}







// "https://api.flightapi.io/onewaytrip/65c87948f47f616e93efde95/HEL/OUL/2024-05-20/1/0/0/Economy/USD"

// itineraries.pricing_options.price.amount
function printAgain() {
    var inputDepartureAirport = document.getElementById('departureAirport').value;
    var inputArrivalAirport = document.getElementById('arrivalAirport').value;
    var inputCurrency = document.getElementById('currency').value;
    var inputClassType = document.getElementById('classType').value;

    if (output && output.itineraries && output.itineraries.length > 0) {
        // Sort itineraries by price
        output.itineraries.sort((a, b) => {
            return a.pricing_options[0].price.amount - b.pricing_options[0].price.amount;
        });

        const cheapestItinerary = output.itineraries[0];
        const cheapestPrice = cheapestItinerary.pricing_options[0].price.amount;

        /****************************************************************** */

        // Display the cheapest itinerary in a popup
        var modal = document.getElementById("myModal");
        modal.style.display = "block";

        // Display the cheapest itinerary in the modal
        document.getElementById("modalText").innerText = `We've located the cheapest ${inputClassType} class flight for you, from ${inputDepartureAirport} to ${inputArrivalAirport} for ${cheapestPrice} ${inputCurrency}`;

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        /****************************************************************** */

        // Print the cheapest itinerary
        const itinerary = cheapestItinerary;
        const legId = itinerary.leg_ids[0]; // Assuming only one leg for simplicity
        const leg = output.legs.find(leg => leg.id === legId);
        const segmentId = leg.segment_ids[0]; // Assuming only one segment for simplicity
        const segment = output.segments.find(segment => segment.id === segmentId);

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

        console.log("Price Amount:", itinerary.pricing_options[0].price.amount);
        console.log("Departure Time:", departureTime);
        console.log("Arrival Time:", arrivalTime);
        console.log("Flight Duration:", flightDuration);
        console.log("Airline:", airline);

        // Formatting the output text
        var outputText = `
        ${inputClassType} class flight from ${inputDepartureAirport} to ${inputArrivalAirport}
        Price:                           ${itinerary.pricing_options[0].price.amount} ${inputCurrency}
        Departure Time:                  ${departureTime.toLocaleString()}
        Arrival Time:                    ${arrivalTime.toLocaleString()}
        Duration:                        ${flightDuration} minutes
        Airline:                         ${airline}
        ------------------------------------------`;

        // Append the formatted text to the element
        document.getElementById('priceDisplay').classList.add('output-text');
        document.getElementById('priceDisplay').innerText = outputText;
    } else {
        console.error("Error: Unable to retrieve flight information.");
        document.getElementById('priceDisplay').innerText = "No available flights. Please re-submit form."
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

function showLoadingGif() {
    const loadingGif = document.createElement("img");
    loadingGif.src = "planeGif.gif";
    loadingGif.id = "loading-gif";
    loadingGif.width = 400;
    document.getElementById('priceDisplay').innerText = "";
    document.getElementById('priceDisplay').appendChild(loadingGif);
}

function hideLoadingGif() {
    const loadingGif = document.getElementById("loading-gif");
    if (loadingGif) {
        loadingGif.parentNode.removeChild(loadingGif);
    }
}

