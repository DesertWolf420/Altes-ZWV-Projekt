const flights = [
  { time: "00:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV430" },
  { time: "05:45", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV430" },
  // ... weitere Einträge
];

let rowStatus = Array(flights.length).fill("");
let rowMarkedForOrange = Array(flights.length).fill(false);
let orangeTimestamps = Array(flights.length).fill(null);

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
  tableBody.innerHTML = '';

  flights.forEach((flight, index) => {
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
  });
}

updateFlights();
setInterval(() => {
  updateClock();
  updateFlights();
}, 1000);
