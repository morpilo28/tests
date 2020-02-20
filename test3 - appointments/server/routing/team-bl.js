const dal = require('../dal');
const table = 'team';
const teamtModel = require('../models/team-model');


function getTeams(callback) {
    dal.readAll(`select * from ${table} order by id`, (err, allTeams) => {
        allTeams = allTeams.map(element => {
            return new teamtModel.Team(element.id, element.name);
        });
        if (err) {
            callback(err);
        } else {
            callback(null, allTeams);
        }
    })
}

module.exports = {
    getTeams: getTeams,
}