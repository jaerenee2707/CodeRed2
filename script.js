function on() {
    console.log("L");
    
}
var apiKey = "65c7bdbf4bc0e34e403d7525";
var tripType = "oneway"

 function fetchFlightInfo() {
    // Define the API URL
     const apiUrl = "https://api.flightapi.io/" + "/" + apiKey + "/HEL/OUL/2024-05-20/1/0/0/Economy/USD";

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Flight Info:", data);
        })
        .catch(error => {
            console.error("Error fetching flight info:", error);
        });
}

