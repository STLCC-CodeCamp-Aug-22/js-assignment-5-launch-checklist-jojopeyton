// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
  let missionTarget = document.getElementById('missionTarget');
  missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter:${diameter} </li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
            <img src="${imageUrl}"/>
            `;
};

function validateInput(testInput) {
   let numInput= Number(testInput);
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(numInput)) {
        return "Not a number";
    } else if (isNaN(numInput)=== false) {
        return "Is a number";
    }
   };


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let cargoStatus = document.getElementById('cargoStatus');
   let pilotStatus = document.getElementById('pilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let copilotStatus = document.getElementById('copilotStatus');

   if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || 
        validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
            alert ('All fields are required');
        } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
            alert('Please enter numerical values for Fuel Level and Cargo Mass');
        } else if (validateInput(pilot)==='Is a Number'||validateInput(copilot)==='Is a Number') {
            alert('Please do not enter numbers for name of pilot or co-pilot');
        } 
        else {
   pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
   copilotStatus.innerHTML = `Co-pilot ${copilot} is ready`;
        }
   if (Number(fuelLevel) < 10000) {
    fuelStatus.innerHTML = `Not enough fuel for journey`;
    list.style.visibility = `visible`;
    launchStatus.innerHTML = `Shuttle not ready for launch`;
    launchStatus.style.color = `red`;
   } else if (Number(cargoLevel) > 10000) {
    list.style.visibility = `visible`;
    cargoStatus.innerHTML = `Too much mass for take off`;
    launchStatus.innerHTML = `Shuttle not ready for launch`;
    launchStatus.style.color = `red`;
   } else {
    list.style.visibility = `visible`;
    fuelStatus.innerHTML = `Fuel levels are good`;
    cargoStatus.innerHTML = `Cargo mass is good`;
    launchStatus.innerHTML = `Shuttle is ready for launch`;
    launchStatus.style.color = `green`;
   }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let loc = Math.floor(Math.random() * planets.length);
    return planets[loc]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
