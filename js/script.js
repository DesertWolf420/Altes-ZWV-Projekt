const flights = [
      { time: "07:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV400 (MO/MI/FR) – Werk 2.1/Werk 2.2", area: "" },
      { time: "07:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV400 (DI/DO) – Werk 2.7", area: "" },
      { time: "07:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV402 – Werk 2.7 Verpackung Wackersdorf", area: "" },
      { time: "06:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV404 – Sammler München", area: "" },
      { time: "07:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV413 – Gelenkwellen 2.44/7.4", area: "" },
      { time: "06:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV415 – Gelenkwellen 7.4", area: "" },
      { time: "12:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV416 – Gelenkwellen 7.4", area: "" },
      { time: "09:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV417 – Wackersdorf 6.2", area: "" },
      { time: "05:45", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV424 – Sammler Werk 2.4/2.44", area: "" },
      { time: "08:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV425 – Werk 2.4 / CSC Portal", area: "" },
      { time: "08:45", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV426 – Wallersdorf Werk 2.91", area: "" },
      { time: "06:45", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV429 – 65.5 - Wagnerhalle", area: "" },
      { time: "17:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV452 – GLW_7.1", area: "" },
      { time: "13:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV400 (MO/MI/FR) – Werk 2.1/Werk 2.2", area: "" },
      { time: "13:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV400 (DI/DO) – Werk 2.7", area: "" },
      { time: "15:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV402 – Werk 2.7 Verpackung Wackersdorf", area: "" },
      { time: "15:45", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV404 – Sammler München", area: "" },
      { time: "10:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV413 – Gelenkwellen 2.44/7.4", area: "" },
      { time: "13:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV413 – Gelenkwellen 2.44/7.4", area: "" },
      { time: "10:45", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV415 – Gelenkwellen 7.4", area: "" },
      { time: "16:45", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV416 – Gelenkwellen 7.4", area: "" },
      { time: "15:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV417 – Wackersdorf 6.2", area: "" },
      { time: "21:30", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV417 – Wackersdorf 6.2", area: "" },
      { time: "12:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV424 – Sammler Werk 2.4/2.44", area: "" },
      { time: "12:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV425 – Werk 2.4 / CSC Portal", area: "" },
      { time: "13:45", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV426 – Wallersdorf Werk 2.91", area: "" },
      { time: "09:30", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV429 – 65.5 - Wagnerhalle", area: "" },
      { time: "12:15", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV429 – 65.5 - Wagnerhalle", area: "" },
      { time: "15:00", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV429 – 65.5 - Wagnerhalle", area: "" },
      { time: "17:45", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV429 – 65.5 - Wagnerhalle", area: "" },
      { time: "20:30", destination: "Anmeldung Wareneingang Werk 4.1", flight: "ZWV429 – 65.5 - Wagnerhalle", area: "" }
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
