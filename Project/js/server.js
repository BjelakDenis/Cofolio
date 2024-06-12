const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = []; // In-memory user storage, replace with a proper database in a real app

// Registration endpoint
app.post('/register', (req, res) => {
    const { username, password, securityQuestion, securityAnswer } = req.body;

    // Store the user data (in a real app, you would store this in a database)
    users.push({ username, password, securityQuestion, securityAnswer });
    res.status(200).send({ message: 'Registration successful' });
});

// Reset password endpoint
app.post('/reset-password', (req, res) => {
    const { username, securityAnswer, newPassword } = req.body;

    // Find the user
    const user = users.find(u => u.username === username && u.securityAnswer === securityAnswer);

    if (user) {
        // Update the user's password
        user.password = newPassword;
        res.status(200).send({ message: 'Password reset successful' });
    } else {
        res.status(400).send({ message: 'Invalid username or security answer' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
