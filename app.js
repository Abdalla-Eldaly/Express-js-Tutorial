const express = require('express');
const app = express();

const users = [];
app.use(express.json());

app.get('/users', (request, response) => {
    if (users.length === 0) {
        response.status(200).send("Users not found!");
        return;
    }
    response.send(users);
});

app.post('/users', (request, response) => {
    const user = request.body;

    // Check if user already exists
    const findUser = users.find(x => x.id === user.id);
    if (findUser) {
        response.status(400).send('User already exists');
        return;
    }

    // Add new user to the list
    users.push(user);
    response.status(201).send('User created successfully');
});

app.delete('/users/:id', (request, response) => {
    const userId = parseInt(request.params.id, 10);
    
    // Find the index of the user to delete
    const userIndex = users.findIndex(x => x.id === userId);
    if (userIndex === -1) {
        response.status(404).send('User not found');
        return;
    }
    
    // Remove the user from the list
    users.splice(userIndex, 1);
    response.status(200).send('User deleted successfully');
});

// PUT route to update a user by id
app.put('/users/:id', (request, response) => {
    const userId = parseInt(request.params.id, 10);
    const updatedUser = request.body;

    // Find the index of the user to update
    const userIndex = users.findIndex(x => x.id === userId);
    if (userIndex === -1) {
        response.status(404).send('User not found');
        return;
    }

    // Update the user details
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    response.status(200).send('User updated successfully');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
