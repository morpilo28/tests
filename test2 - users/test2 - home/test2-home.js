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
        add1RandomUser(false);
    });

    $(document).on('click', '#delete', deleteUser);
    $(document).on('click', '#edit', editUser);
    $(document).on('click', '#ok', function () {
        hideOrShowBtn(this, '#edit');
        let idx = $(this).attr('data-btn-id');
        isEditable(idx, "false");
        saveEditChanges(this, idx);
    });
}

function add1RandomUser() {
    let url = "https://randomuser.me/api/"
    jQuery.get(url, function (result) {
        app.usersArray.push(result.results[0]);
        let lastIdxInArray = app.usersArray.length - 1;
        joinToFullName(lastIdxInArray);
        drawUsersCards(lastIdxInArray);
    });
}

function load10RandomUsers() {
    let url = "https://randomuser.me/api/?results=10";
    jQuery.get(url, function (result) {
        app.usersArray = [...result.results];
        for (let i = 0; i < app.usersArray.length; i++) {
            joinToFullName(i);
            drawUsersCards(i);
        }
    });
}

function joinToFullName(i) {
    app.usersArray[i].id.name = (`${app.usersArray[i].name.title} ${app.usersArray[i].name.first} ${app.usersArray[i].name.last}`);
}

function drawUsersCards(index) {
    $('.row').append(`
            <div id="user${app.userId}" data-user-name="${app.usersArray[index].id.name}" class="userBox col-md-3">
                <img src="${app.usersArray[index].picture.large}" class="image"></img>
                <p>Gender: ${app.usersArray[index].gender}</p>
                <p>Full Name: 
                    <span" data-edit-name="${app.userId}">${app.usersArray[index].id.name}</span>
                </p>
                <p>Age: ${app.usersArray[index].dob.age}</p>
                <p>Email: 
                <span data-edit-email="${app.userId}">${app.usersArray[index].email}</span>
                </p>
                <button id="delete" data-user-box-for-delete="${app.usersArray[index].picture.large}">Delete</button>
                <button id="edit" data-user-box-for-edit="${app.userId}">Edit</button>
                <button id="ok" data-btn-id="${app.userId}" data-save-edit="${app.usersArray[index].picture.large}">Ok</button>
            </div>`);
    app.userId++;
    setLocalStorage();
}

function deleteUser() {
    for (let i = 0; i < app.usersArray.length; i++) {
        if (app.usersArray[i].picture.large === $(this).attr('data-user-box-for-delete')) {
            app.usersArray.splice(i, 1);
            console.log(app.usersArray);
        }
    }
    $(this).parent().remove();
    setLocalStorage();
}

function editUser() {
    let idx = $(this).attr('data-user-box-for-edit');
    console.log((idx));
    isEditable(idx, "true");
    hideOrShowBtn(this, '#ok');
}

function hideOrShowBtn(currentElement, siblingElement) {
    $(currentElement).css('display', 'none');
    $(currentElement).siblings(siblingElement).css('display', 'block');
}

function saveEditChanges(thisElement, idx) {
    for (let i = 0; i < app.usersArray.length; i++) {
        if (app.usersArray[i].picture.large === $(thisElement).attr('data-save-edit')) {
            console.log(app.usersArray);
            app.usersArray[i].id.name = $(`[data-edit-name=${idx}]`).text();
            app.usersArray[i].email = $(`[data-edit-email=${idx}]`).text();
        }
    }
    setLocalStorage();
}

function isEditable(idx, state) {
    $(`[data-edit-name=${idx}]`).attr('contenteditable', state);
    $(`[data-edit-email=${idx}]`).attr('contenteditable', state);
}

function getLocalStorage() {
    let UsersStr = null; //initialization of key in local storage
    UsersStr = localStorage.getItem("users" + app.usersArray);
    if (UsersStr && UsersStr !== '[]') {
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
