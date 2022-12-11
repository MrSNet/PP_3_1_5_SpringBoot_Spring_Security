

const URL = "http://localhost:8080/adminUserRest";
export function adminUser(URL) {
    const tableSectionElement = document.querySelector('tbody');
    const navbarEmail = document.getElementById('email');
    const navbarRoles = document.getElementById('roles');
    fetch(URL)
        .then(response => response.json())
        .then(user => {
            // console.log(user);

            let tmp = '';
            tmp += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(role => role.padStart(6,' '))}</td>
                </tr>`;
            tableSectionElement.innerHTML = tmp;

            navbarEmail.innerText = `${user.email}`;
            navbarRoles.innerText = `${user.roles.map(role => role.padStart(6,' '))}`;
        });

}

adminUser(URL);