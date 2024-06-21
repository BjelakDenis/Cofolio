const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.static('public'));

let users = []; // In-memory user storage, replace with a proper database in a real app

app.post('/register', (req, res) => {
    const { username, password, securityQuestion, securityAnswer } = req.body;

    // Store the user data (in a real app, you would store this in a database)
    users.push({ username, password, securityQuestion, securityAnswer });
    console.log('New User Registration:', req.body);
    res.status(200).send({ message: 'Registration successful' });
});

app.use(express.json());

app.post('/register', (req, res) => {
    const { username, password, securityQuestion, securityAnswer } = req.body;

    if (username && password && securityQuestion && securityAnswer) {
        res.status(200).json({ message: 'Registration successful' });
    } else {
        res.status(400).json({ message: 'Invalid data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
