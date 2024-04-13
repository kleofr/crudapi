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
                const li = document.createElement('li');
                li.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
                userList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    const crudOptions = document.getElementById('crudOptions');
    const createForm = document.getElementById('createForm');
    const readSection = document.getElementById('readSection');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');
    const userList = document.getElementById('userList');

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
});