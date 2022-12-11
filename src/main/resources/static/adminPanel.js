
const URL = "http://localhost:8080/adminPanelRest/";
const URL_USER = "http://localhost:8080/adminUserRest";
const URL_UPDATE = "http://localhost:8080/adminPanelRest/updateUserRest";
const URL_CREATE = "http://localhost:8080/adminPanelRest/addUserRest";
const URL_DEL = "http://localhost:8080/adminPanelRest/deleteUserRest/";

let tmp = '';
let rolesIdFromUser = [];

const ROLES = [{id: 1, name: "USER"}, {id: 2, name: "ADMIN"}]

    const tableSectionElement = document.querySelector('tbody');
    const navbarEmail = document.getElementById('email');
    const navbarRoles = document.getElementById('roles');


    fetch(URL_USER)
        .then(response => response.json())
        .then(user => {
            navbarEmail.innerText = `${user.email}`;
            navbarRoles.innerText = `${user.roles.map(role => role.padStart(6,' '))}`;

        });

const showUsers = (users) => {

    users.map(user =>

        tmp += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(role => role.padStart(6,' '))}</td>
                    <td class="text text-white"><a class="btnEdit btn btn-info">Edit</a></td>  
                    <td class="text text-white"><a class="btnDelete btn btn-danger">Delete</a></td>
                </tr>`
    );

    tableSectionElement.innerHTML = tmp;

};

fetch(URL)
    .then(response => response.json())
    .then(data => showUsers(data))
    // .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            tmp = ''
            showUsers(data)
        })
        // .catch(error => console.log(error))
}


// модальное окно редактирования
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'));
const editForm = document.getElementById('modalEdit')
const editId = document.getElementById('editId')
const firstName = document.getElementById('FirstName')
const lastName = document.getElementById('LastName')
const emailEdit = document.getElementById('emailEdit')
const password = document.getElementById('password')
const rolesEdit = document.getElementById('rolesEdit')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

let formId = 0
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    formId = row.firstElementChild.innerHTML
    fetch(URL + formId, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        // .catch(error => console.log(error))
    const getUserById = (user) => {
        editId.value = user.id
        firstName.value = user.firstName
        lastName.value = user.lastName
        emailEdit.value = user.email
        password.value = ''
        rolesEdit.innerHTML = `
                                <option value=${ROLES[0].id}>${ROLES[0].name}</option>
                                <option value=${ROLES[1].id}>${ROLES[1].name}</option>
                                `
        modalEdit.show()
    }
})

editForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let rolesId = [];
    let rolesIdFromSelect = Array.from($("#rolesEdit").val());
    if (rolesIdFromSelect.length > 0) {
        rolesId = rolesIdFromSelect;
    } else {
        rolesId = rolesIdFromUser;
    }


    fetch(URL_UPDATE, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            id: formId,
            firstName: firstName.value,
            lastName: lastName.value,
            email: emailEdit.value,
            password: password.value,
            roles: rolesId
        })
    })
        .then(res => res.json())
        // .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalEdit.hide()
})

// модальное окно удаления
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'));
const delForm = document.getElementById('delForm')

const delId = document.getElementById('delId')
const delFirstName = document.getElementById('delFirstName')
const delLastName = document.getElementById('delLastName')
const delEmail = document.getElementById('delEmail')
const delRoles = document.getElementById('delRoles')

on(document, 'click', '.btnDelete', event => {
    formId = event.target.parentNode.parentNode.firstElementChild.innerHTML

    fetch(URL + formId, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => getUserById(data))
        // .catch(error => console.log(error))

    const getUserById = (user) => {
        delId.value = user.id
        delFirstName.value = user.firstName
        delLastName.value = user.lastName
        delEmail.value = user.email
        delRoles.innerHTML =`
                               <option>${user.roles.map(role => role.padStart(6,' '))}</option>
                            `
        modalDelete.show()
    }
})

delForm.addEventListener('submit', event => {
    event.preventDefault()

    fetch(URL_DEL + formId, {
        method: 'DELETE'
    })
        // .catch(err => console.log(err))
        .then(reloadShowUsers)
    modalDelete.hide()
})



//добавление user
const allUsers = document.getElementById('usersTable')

const tabNewUser = document.getElementById('tabNewUser')
const addFirstName = document.getElementById('addFirstName')
const addLastName = document.getElementById('addLastName')
const addEmail = document.getElementById('addEmail')
const addPassword = document.getElementById('addPassword')
const addRoles = document.getElementById('addRoles')


tabNewUser.addEventListener('click', () => {
    addFirstName.value = ''
    addLastName.value = ''
    addEmail.value = ''
    addPassword.value = ''
    addRoles.innerHTML = `
                                <option value=${ROLES[0].id}>${ROLES[0].name}</option>
                                <option value=${ROLES[1].id}>${ROLES[1].name}</option>
                                `
})

document.getElementById("createUserForm")
    .addEventListener("submit", event => {
        event.preventDefault();

        let rolesId = [];
        let rolesIdFromSelect = Array.from($("#addRoles").val());
        if (rolesIdFromSelect.length > 0) {
            rolesId = rolesIdFromSelect;
        } else {
            rolesId = rolesIdFromUser;
        }

        fetch(URL_CREATE, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                firstName: addFirstName.value,
                lastName: addLastName.value,
                email: addEmail.value,
                password: addPassword.value,
                roles: rolesId
            })
        })
            .then(res => res.json())
            // .catch(error => console.log(error))
            .then(reloadShowUsers)
        allUsers.click()
    })


