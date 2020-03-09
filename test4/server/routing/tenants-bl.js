const dal = require('../dal');
const tenantTable = 'tenant';

function getTenants(callback) {
    dal.readAll(`select * from ${tenantTable}`, (e, d) => {
        if (e) {
            callback(e);
        } else {
            callback(null, d);
        }
    })
}

module.exports = {
    getTenants: getTenants,
}