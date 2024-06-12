function showSection(section) {
    var sections = document.getElementsByClassName('section');
    var formBoxes = document.getElementsByClassName('form-box');

    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }

    for (var i = 0; i < formBoxes.length; i++) {
        formBoxes[i].style.display = 'none';
    }

    if (section === 'home') {
        document.getElementById('home').style.display = 'block';
    } else if (section === 'about') {
        document.getElementById('about').style.display = 'block';
    } else if (section === 'services') {
        document.getElementById('services').style.display = 'block';
    } else if (section === 'login') {
        document.getElementById('login').style.display = 'block';
    } else if (section === 'register') {
        document.getElementById('register').style.display = 'block';
    } else if (section === 'forgot-password') {
        document.getElementById('forgot-password').style.display = 'block';
    }
}

async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const securityQuestion = document.getElementById('security-question').value;
    const securityAnswer = document.getElementById('security-answer').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, securityQuestion, securityAnswer })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Registration successful');
        showSection('login'); // Redirect to the login page after successful registration
    } else {
        alert('Registration failed: ' + data.message);
    }
}

async function resetPassword() {
    const username = document.getElementById('forgot-username').value;
    const securityAnswer = document.getElementById('forgot-answer').value;
    const newPassword = document.getElementById('new-password').value;

    const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, securityAnswer, newPassword })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Password reset successful');
        showSection('login');
    } else {
        alert('Password reset failed: ' + data.message);
    }
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    register();
});

document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    resetPassword();
});