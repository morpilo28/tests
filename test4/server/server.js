"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const tenantsBl = require('./routing/tenants-bl');
const tasksBl = require('./routing/tasks-bl');
const PORT = 3201;
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

app.get('/tenants', (req, res) => {
    tenantsBl.getTenants((e, d) => {
        if (e) {
            return res.status(400).send('no users have been found');
        } else {
            return res.send(d);
        }
    })
})

app.get('/tasks', (req, res) => {
    tenantsBl.getTenants((e, allTenants) => {
        if (e) {
            return res.status(400).send('no users have been found');
        } else {
            tasksBl.getTasks((e, allTasks) => {
                if (e) {
                    return res.status(400).send('no tasks have been found');
                } else {
                    allTasks.map((task) => {
                        for (let i = 0; i < allTenants.length; i++) {
                            if (task.tenantId === allTenants[i].id) {
                                task.tenantId = allTenants[i].name;
                            }
                        }
                    })
                    return res.send(allTasks);
                }
            })
        }
    })
})

app.post('/tasks', (req, res) => {
    const taskToAdd = req.body;
    tenantsBl.getTenants((e, allTenants) => {
        if (e) {
            return res.status(400).send('no users have been found');
        } else {
            for (let i = 0; i < allTenants.length; i++) {
                if (taskToAdd.tenantName === allTenants[i].name) {
                    taskToAdd.tenantName = allTenants[i].id;
                }
            }
            tasksBl.createTask(taskToAdd, (e, d) => {
                if (e) {
                    res.status(400).send("can't add task");
                } else {
                    return res.send(d);
                }
            })
        }
    })
});

app.listen(process.env.PORT || PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`),
);
