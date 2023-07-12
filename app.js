const express = require('express');
const fs = require('fs');

const app = express();

// GET /users endpoint
app.get('/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to fetch users.' });
        }

        try {
            const users = JSON.parse(data);
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Unable to parse user data.' });
        }
    });
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to fetch user.' });
        }

        try {
            const users = JSON.parse(data);
            const user = users.find((user) => user.id === userId);
            console.log(user)
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            res.json({
                id: user.id,
                name: user.name,
                email: user.email
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Unable to parse user data.' });
        }
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Unable to create user.' });
        }

        try {
            const users = JSON.parse(data);
            const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;   // Main logic 
            newUser.id = newUserId;
            users.push(newUser);

            const updatedData = JSON.stringify(users, null, 2);

            fs.writeFile('users.json', updatedData, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Unable to create user.' });
                }

                res.status(201).json({ message: 'User created successfully.', user: newUser });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Unable to parse user data.' });
        }
    });
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    fs.readFile('users.json' , 'utf-8' , (data , err) =>{
        const users = JSON.parse(data); 
         const user = users.find(user => user.id === userId);
         users = []; // Provide a default empty array if parsing fails
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Update the user details
    user.name = name || user.name;
    user.email = email || user.email;

    res.status(201).json({ message: 'User details updated', user });
    })
    // Finding id 
  
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    // Read user data from the JSON file
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const users = JSON.parse(data)
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        users.splice(userIndex, 1); // Main function for removing the user from the array 

        // updating the users json file 
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
            if (err) {
                console.error('Error writing user data:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'User deleted' });
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
