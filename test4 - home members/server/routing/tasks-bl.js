
const dal = require('../dal');
const taskTable = 'task';

function getTasks(callback) {
    dal.readAll(`select * from ${taskTable}`, (e, d) => {
        if (e) {
            callback(e);
        } else {
            callback(null, d);
        }
    })
}

function createTask(objToAdd, callback){
    objToAdd.tenantId = Number(objToAdd.tenantId);
    dal.createOne(`insert into ${taskTable} (description, date, tenantId) values ('${objToAdd.description}', '${objToAdd.date}',${objToAdd.tenantName});`, `select * from ${taskTable} where id = (select max(id) from ${taskTable})`, (e, data) => {
        if (e) {
            callback(e);
        } else {
            callback(null, data);
        }
    })
}

module.exports = {
    getTasks: getTasks,
    createTask:createTask,
}