var flights;

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
}

function markAsDone(index, color) {
  rowStatus[index] = color;
  updateFlights();
}

function resetStatus(index) {
  rowStatus[index] = "";
  rowMarkedForOrange[index] = false;
  orangeTimestamps[index] = null;
  updateFlights();
}

function updateFlights() {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const tableBody = document.querySelector('#flight-table tbody');

  var urlParams = new URLSearchParams(window.location.search);
  var board = urlParams.get('board');

  if (board == null) {
    board = 'Landshut'
  }

  var flights_url = 'https://zwv.samaxi.de/rest/flights.json';

  $.getJSON(flights_url, function(data) {
    flights = data;

    var rowStatus = Array(flights.length).fill("");
    var rowMarkedForOrange = Array(flights.length).fill(false);
    var orangeTimestamps = Array(flights.length).fill(null);

    tableBody.innerHTML = '';
    flights.forEach((flight, index) => {
      if (flight.board == board ) {
	const row = document.createElement('tr');
	const flightTime = flight.time;
	const [flightHours, flightMinutes] = flight.time.split(':');
	const flightDateTime = new Date();
	flightDateTime.setHours(flightHours);
	flightDateTime.setMinutes(flightMinutes);
	const timeDifferenceInMinutes = Math.floor((now - flightDateTime) / 60000);

	if (orangeTimestamps[index]) {
	  const elapsedTimeSinceOrange = (now - orangeTimestamps[index]) / (1000 * 60 * 60);
	  if (elapsedTimeSinceOrange >= 24) {
	    rowMarkedForOrange[index] = false;
	    orangeTimestamps[index] = null;
	  }
	}

	let rowClass = '';
	if (rowStatus[index] === "green") {
	  rowClass = 'green-row';
	} else if (rowStatus[index] === "red") {
	  rowClass = 'red-row';
	} else if (rowMarkedForOrange[index]) {
	  rowClass = 'orange';
	} else if (timeDifferenceInMinutes > 5) {
	  rowMarkedForOrange[index] = true;
	  orangeTimestamps[index] = new Date();
	  rowClass = 'orange';
	} else if (flightTime === currentTime) {
	  rowClass = 'blink';
	}

	row.innerHTML = `
	  <td class="${rowClass}">${flight.time}</td>
	  <td class="${rowClass}">${flight.destination}</td>
	  <td class="${rowClass}">${flight.flight}</td>
	  <td class="${rowClass}">${rowStatus[index]}</td>
	  <td class="${rowClass}">
	    <button onclick="markAsDone(${index}, 'green')">Erledigt</button>
	    <button onclick="markAsDone(${index}, 'red')">nicht erledigt</button>
	    <button onclick="resetStatus(${index})">Zurücksetzen</button>
	  </td>
	`;
	tableBody.appendChild(row);
      }
    });
  });
}

updateFlights();
setInterval(() => {
  updateClock();
  updateFlights();
}, 1000);
