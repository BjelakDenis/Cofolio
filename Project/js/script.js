function showSection(section) {
    var sections = document.getElementsByClassName('section');
    var formBoxes = document.getElementsByClassName('form-box');
    var allSections = Array.from(sections).concat(Array.from(formBoxes));

    for (var i = 0; i < allSections.length; i++) {
        allSections[i].style.display = 'none';
    }

    document.getElementById(section).style.display = 'block';
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
        showSection('login');
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

document.addEventListener('DOMContentLoaded', function() {
    showSection('login');
});
