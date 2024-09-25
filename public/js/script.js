var flights;

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
}

function setState(id, new_state) {
  var ds = {"state": new_state};
  $.ajax({
    url:         '/rest/history/' + id,
    method:      'PUT',
    data:        JSON.stringify(ds),
    dataType:    'json'
  }).done(function(msg) {
    console.log(msg);
    updateFlights();
  });
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

  var url    = 'rest/history/list';
  var filter   = { "filters" : {"time":"today","board":board}};

  $.post(url, JSON.stringify(filter), function(data) {
    flights = data['flights'];

    var rowStatus = Array(flights.length).fill("");
    var rowMarkedForOrange = Array(flights.length).fill(false);
    var orangeTimestamps = Array(flights.length).fill(null);

    tableBody.innerHTML = '';
    flights.forEach((flight, index) => {
      if (flight.board == board ) {
	const row = document.createElement('tr');
	var fDT = new Date(flight.time*1000);
	var timeDifferenceInMinutes = Math.floor((now - fDT) / 60000);

	if (orangeTimestamps[index]) {
	  const elapsedTimeSinceOrange = (now - orangeTimestamps[index]) / (1000 * 60 * 60);
	  if (elapsedTimeSinceOrange >= 24) {
	    rowMarkedForOrange[index] = false;
	    orangeTimestamps[index] = null;
	  }
	}

	var TS = `${String(fDT.getHours()).padStart(2, '0')}:${String(fDT.getMinutes()).padStart(2, '0')}`;

	var state2class = new Array('black', 'red-row', 'green-row');
	let rowClass = state2class[flight.state];
	if (flight.state < 1 && timeDifferenceInMinutes > 5) {
	  rowClass = 'orange';
	};

	if (TS === currentTime) {
	  rowClass = 'blink';
	}
 
	row.innerHTML = `
	  <td class="${rowClass}">${TS}</td>
	  <td class="${rowClass}">${flight.destination}</td>
	  <td class="${rowClass}">${flight.flight}</td>
	  <td class="${rowClass}">${rowStatus[index]}</td>
	  <td class="${rowClass}">
	    <button onclick="setState(${flight.id}, 2)">Erledigt</button>
	    <button onclick="setState(${flight.id}, 1)">nicht erledigt</button>
	    <button onclick="setState(${flight.id}, 0)">Zurücksetzen</button>
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
}, 10000);
