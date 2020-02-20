const dal = require('../dal');
const table = 'appointment';
const appointmentModel = require('../models/appointment-model');

function getAppointments(callback) {
    dal.readAll(`select * from ${table} order by id`, (err, allAppointment) => {
        allAppointment = allAppointment.map(element => {
                    return new appointmentModel.Appointment(element.id, element.teamName, element.description, element.fromDate, element.toDate, element.room);
                });
        if (err) {
            callback(err);
        } else {
            callback(null, allAppointment);
        }
    })
}

function createAppointments(objToAdd, callback) {
    objToAdd.teamName = Number(objToAdd.teamName);
    objToAdd.room = Number(objToAdd.room);
    const { teamName, fromDate, toDate, description, room } = objToAdd;

    dal.createOne(`insert into ${table} (teamName, description, fromDate, toDate, room) values
    (${teamName}, '${description}', '${fromDate}', '${toDate}', ${room})`, (e) => {
        if (e) {
            callback(e);
        } else {
            dal.readAll(`select * from ${table} order by id`, (err, allAppointment) => {
                if (err) {
                    callback(err);
                } else {
                    //returns an array of obj
                    callback(null, allAppointment);
                }
            })
        }
    })
};

function geSomeAppointments(teamId ,callback) {
    teamId = Number(teamId);
    dal.readAll(`select * from ${table} where teamName = ${teamId}`, (err, teamAppointment) => {
        teamAppointment = teamAppointment.map(element => {
                    return new appointmentModel.Appointment(element.id, element.teamName, element.description, element.fromDate, element.toDate, element.room);
                });
        if (err) {
            callback(err);
        } else {
            callback(null, teamAppointment);
        }
    })
}

module.exports = {
    getAppointments: getAppointments,
    createAppointments: createAppointments,
    geSomeAppointments:geSomeAppointments
}