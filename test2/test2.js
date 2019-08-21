"use strict";

const app = {
    userId: 0,
    usersArray: [],
}

function main() {
    $('#mainPage').append(` 
    <header>
        <h1>Random User Client</h1>
    </header>
    <button id="btnGenerateUser">Generate User</button>
    <div id="resultsBox">
        <div class="row"></div>
    </div>`);
    getLocalStorage();

    $('#btnGenerateUser').click(function () {
        add1RandomUser();
    });

    $(document).on('click', '#delete', deleteUser);
    $(document).on('click', '#edit', makeEditable);
}

function add1RandomUser(result) {
    let url = "https://randomuser.me/api/"
    jQuery.get(url, function (result) {
        app.usersArray.push(result.results[0]);
        let lastIdxInArray = app.usersArray.length - 1;
        drawUsersCards(lastIdxInArray);
    });
}

function load10RandomUsers() {
    let url = "https://randomuser.me/api/?results=10";
    jQuery.get(url, function (result) {
        app.usersArray = [...result.results];
        for (let i = 0; i < app.usersArray.length; i++) {
            drawUsersCards(i);
        }
    });
}

function drawUsersCards(index) {
    let usersName = (`${app.usersArray[index].name.title} ${app.usersArray[index].name.first} ${app.usersArray[index].name.last}`);
    $('.row').append(`
            <div id="user${app.userId}" data-user-name="${usersName}" class="userBox col-md-3">
                <img src="${app.usersArray[index].picture.large}" class="image"></img>
                <p>Gender: ${app.usersArray[index].gender}</p>
                <p>Full Name: 
                    <span data-edit-name="${app.userId}">${usersName}</span>
                </p>
                <p>Age: ${app.usersArray[index].dob.age}</p>
                <p>Email: 
                <span data-edit-email="${app.userId}">${app.usersArray[index].email}</span>
                </p>
                <button id="delete" data-user-box-for-delete="${app.usersArray[index].email}">Delete</button>
                <button id="edit" data-user-box-for-edit="${app.userId}">Edit</button>
            </div>`);
    app.userId++;
    setLocalStorage();
}

function deleteUser() {
    for (let i = 0; i < app.usersArray.length; i++) {
        if (app.usersArray[i].email === $(this).attr('data-user-box-for-delete')) {
            app.usersArray.splice(i, 1);
            console.log(app.usersArray);
        }
    }
    $(this).parent().remove();
    setLocalStorage();
}

function makeEditable() {
    $(`[data-edit-name=${$(this).attr('data-user-box-for-edit')}]`).attr('contenteditable', "true");
    $(`[data-edit-email=${$(this).attr('data-user-box-for-edit')}]`).attr('contenteditable', "true");
}

function getLocalStorage() {
    let UsersStr = null; //initialization of key in local storage
    UsersStr = localStorage.getItem("users" + app.usersArray);
    if (UsersStr) {
        app.usersArray = JSON.parse(UsersStr);
        for (let i = 0; i < app.usersArray.length; i++) {
            drawUsersCards(i);
        }
    } else {
        load10RandomUsers();
    }
}

function setLocalStorage() {
    localStorage.setItem("users", JSON.stringify(app.usersArray));
}

main();
