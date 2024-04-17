

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
        if (!response.ok) {
            console.log(response.status); // Log the status code for debugging
            if (response.status === 404) {
                console.log('Credentials invalid');
            } else {
                console.log('Error:', response.statusText);
            }
        } else {
            console.log('User logged in');
            window.location.href = 'index.html';
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

document.getElementById('loginForm').addEventListener('submit', adminLogin);