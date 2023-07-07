
const express = require('express');
const app = express();

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const person = {
    id: 1,
    name: 'Max',
    email: 'maxpurbia@gmail.com',
    password: 'old1234'

}

app.get('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    console.log('this will always run');
})
app.post('/product', (req, res, next) => {
    res.send('<h1>product pags</h1>')
    console.log(req.body)
    res.redirect('/')


})

app.get('/', (req, res, next) => {
    res.send('<h1>hello Welcome to home page </h1>')

});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Invalid password' });
    }


    return res.json({ message: 'Login successful' });
});


function isValidEmail(email) {

    const emailRegex = /^\S+@\S+\.\S+$/; // email regex validates weather the email is in correct format or not /^ - start of the string \S+ matches one or more non-whitespace characters \. is letral dot 
    return emailRegex.test(email);
}

app.put('/password', (req, res) => {
    const currentpassword = req.body.currentpassword;
    const newpassword = req.body.newpassword

    if (currentpassword !== user.password) {
        return res.status(400).json({ error: 'password is incorrect ' })

    }
    else {
        user.password = newpassword
        return res.status(200).json({ message: 'Password changed successfull' })
    }
})

app.listen(3000)

