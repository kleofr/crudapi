const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Function to add a new user
 function addUser(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Make a POST request to the backend to add the user
    fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, name, email })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log the response from the server
        // Call the function to add the new user to the list
        // Reset the form
        createForm.reset();
    })
    .catch(error => {
        console.error('Error adding user:', error);
    });
}

function fetchUser() {
    fetch('http://localhost:3000/read')
        .then(response => response.json())
        .then(data => {
            // Clear previous user list
            userList.innerHTML = '';
            // Iterate over the fetched users and add them to the list
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                `;
                document.getElementById('userList').appendChild(row);
            });
            
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}
function updateUser(event) {
    event.preventDefault();
    const id = document.getElementById('updateid').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;

    // Make a POST request to the backend to add the user
    fetch('http://localhost:3000/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, name, email })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log the response from the server
        // Call the function to add the new user to the list
        // Reset the form
        updateForm.reset();
        console.log("successful");
    })
    .catch(error => {
        console.error('Error update user:', error);
    });
}

function deleteUser(event) {
    event.preventDefault();
    const id = document.getElementById('deleteId').value;

    // Make a POST request to the backend to add the user
    fetch('http://localhost:3000/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log the response from the server
        // Call the function to add the new user to the list
        // Reset the form
        deleteForm.reset();
        console.log("successful");
    })
    .catch(error => {
        console.error('Error delete user:', error);
    });
}

function adminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username);
    console.log(password);

    // Make a POST request to the backend to add the user
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if(!response.ok){
            if(response.status == 200){
                console.log('User logged in')
                
            }
            if(response.status == 404){
                console.log('Credentials invalid');
            }
        }
    })
    .then(data => {
        console.log(data); // Log the response from the server
        // Call the function to add the new user to the list
        // Reset the form
        loginForm.reset();
        console.log("successful");
    })
    .catch(error => {
        console.error('Error checking for credentials:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logoutBtn');

    // Add click event listener to logout button
    logoutBtn.addEventListener('click', function () {
        // Implement logout logic here
        // For example, clearing user credentials and redirecting to login page
        alert('Logging out...');
        // Redirect to the login page
        window.location.href = 'login.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const crudOptions = document.getElementById('crudOptions');
    const createForm = document.getElementById('createForm');
    const readSection = document.getElementById('readSection');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');
    const userList = document.getElementById('userList');
    const loginForm = document.getElementById('loginForm');

    // Function to show form/section based on user selection
    function showForm(formElement) {
        createForm.style.display = 'none';
        readSection.style.display = 'none';
        updateForm.style.display = 'none';
        deleteForm.style.display = 'none';
        formElement.style.display = 'block';
    }

    // Event listeners for CRUD option buttons
    document.getElementById('createOption').addEventListener('click', function () {
        showForm(createForm);
    });

    document.getElementById('readOption').addEventListener('click', function () {
        showForm(readSection);
        fetchUser();
    });

    document.getElementById('updateOption').addEventListener('click', function () {
        showForm(updateForm);
    });

    document.getElementById('deleteOption').addEventListener('click', function () {
        showForm(deleteForm);
    });


    // Event listener for form submission
    createForm.addEventListener('submit', addUser);
    updateForm.addEventListener('submit', updateUser);
    deleteForm.addEventListener('submit', deleteUser);
    loginForm.addEventListener('submit', adminLogin);
});
