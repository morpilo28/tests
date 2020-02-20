const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const teamBl = require('./routing/team-bl');
const appointmentbL = require('./routing/appointment-bl');
const PORT = 3201;
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

app.get('/teams', (req, res) => {
    teamBl.getTeams((e, allTeams) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(allTeams);
        }
    })
})

app.get('/appointments', (req, res) => {
    appointmentbL.getAppointments((e, allAppointments) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(allAppointments);
        }
    })
})

app.get('/appointments/:id', (req, res) => {
    const teamId = req.params.id;
    appointmentbL.geSomeAppointments(teamId, (e, teamAppointments) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(teamAppointments);
        }
    })
})

app.post('/appointments', (req, res) => {
    let objToAdd = req.body;
    appointmentbL.createAppointments(objToAdd,(e, allAppointments) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(allAppointments);
        }
    })
})

app.listen(process.env.PORT || PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`),
);