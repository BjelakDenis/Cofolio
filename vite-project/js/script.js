function showSection(section) {
    var loginForm = document.getElementById('login');
    var registerForm = document.getElementById('register');
    if (section === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else if (section === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

async function login() {
    const username = document.getElementById('Uname').value;
    const password = document.getElementById('Pass').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
        // Redirect or show logged-in UI
    } else {
        alert('Login failed: ' + data.message);
    }
}

async function register() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (data.message === 'User registered successfully') {
        alert('Registration successful');
        showSection('login');
    } else {
        alert('Registration failed: ' + data.message);
    }
}