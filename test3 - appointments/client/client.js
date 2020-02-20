
var app = {
    endPointStart: `http://localhost:3201/`,
    END_POINTS: {
        teams: 'teams',
        appointments: 'appointments',
    },
    METHODS: {
        GET: 'GET',
        POST: 'POST',
    },
};

getTeamsList();
getAppointmentList();

function getTeamsList() {
    fetch(app.endPointStart + app.END_POINTS.teams, {
        method: app.METHODS.GET,
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        res.json().then(pageView)
    }).catch(status => console.log(status));
}

function getAppointmentList() {
    fetch(app.endPointStart + app.END_POINTS.appointments, {
        method: app.METHODS.GET,
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        res.json().then(showList)
    }).catch(status => console.log(status));
}

function pageView(res) {
    let html = `
    <select id='teamSelection' onchange='showSomeAppointment()' >
        <option value="teams"></option>
    `
    for (let i = 0; i < res.length; i++) {
        html += `<option id='option${res[i].id}' value="${res[i].id}">${res[i].name}</option>`
    }
    html += `
    </select>
    <br><br>
        <form>
            <label> Team: <input type="number" min=1 max=${res.length} id='teamAdded'/></label>
            <label> from date: <input type="date" id='fromDateAdded'/></label>
            <label> to date: <input type="date" id='toDateAdded'/></label>
            <label> description: <input type="text" id='descriptionAdded'/></label>
            <label> room: <input type="text" id='roomAdded'/></label>
            <button id='add'>Add</button>
        </form>`

    document.getElementById('formAndFilter').innerHTML = html;
    document.getElementById('add').addEventListener('click', addAppointments);
}

function showList(res) {
    let html = `<div>`;
    for (let i = 0; i < res.length; i++) {
        html += `
        <div class='card' id='card${res[i].id}'>
            <div id='appointmentTeamName${res[i].id}'>TEAM NAME: ${res[i].teamName}</div><br>
            <div id='appointmentFromDate${res[i].id}'>FROM: ${res[i].fromDate}</div><br>
            <div id='appointmentToDate${res[i].id}'>TO: ${res[i].toDate}</div><br>
            <div id='appointmentDescription${res[i].id}'>DESCRIPTION: ${res[i].description}</div><br>
            <div id='appointmentRoom${res[i].id}'>ROOM: ${res[i].room}</div><br>
        </div>
        `
    }
    html += `</div>`
    document.getElementById('main').innerHTML = html;
}

function addAppointments() {
    const objToAdd = {
        teamName: document.getElementById('teamAdded').value,
        fromDate: document.getElementById('fromDateAdded').value,
        toDate: document.getElementById('toDateAdded').value,
        description: document.getElementById('descriptionAdded').value,
        room: document.getElementById('roomAdded').value,
    }

    fetch(app.endPointStart + app.END_POINTS.appointments, {
        method: app.METHODS.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objToAdd)
    }).then(res => {
        res.json().then(showList)
    }).catch(status => console.log(status));
}

function showSomeAppointment() {
    const teamId = document.getElementById('teamSelection').value;
    if (teamId === 'teams') {
        getAppointmentList();
    } else {
        fetch(app.endPointStart + app.END_POINTS.appointments + '/' + teamId, {
            method: app.METHODS.GET,
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            res.json().then(showList)
        }).catch(status => console.log(status));
    }
}