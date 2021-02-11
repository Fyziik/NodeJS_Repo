const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

//Mock-up databases
const userDatabase = [
    {
        id: 0,
        name: "Andreas",
        url: "https://www.andreas.com"
    },
    {
        id: 1,
        name: "Ida",
        url: "https://www.ida.com"
    },
    {
        id: 2,
        name: "Jonas",
        url: "https://www.jonas.com"
    }
]

const carsDatabase = [
    {
        id: 0,
        manufactor: "Volvo",
        model: "XC90"        
    },
    {
        id: 1,
        manufactor: "Ford",
        model: "Mustang 5.0" 
    },
    {
        id: 2,
        manufactor: "Tesla",
        model: "S" 
    }
]

const home = path.join(__dirname + '/index.html')



// ---Home routing---
app.get("/", (req, res) => {
    res.sendFile(home)
})





// ---Users routing---
// HTTP GET
// Return entire list of users on /users
app.get("/users", (req, res) => {
    res.send({userDatabase})
})

// Return specific user by id on /users/id
app.get("/users/:id", (req, res) => {

    for (let k = 0; k < userDatabase.length; k++) {

        if (userDatabase[k].id == req.params.id) {

            res.send({ Found: userDatabase[k] })
        }
    }
    

})

// HTTP POST
// Add user from form with data, and redirect to homepage 
app.post("/users", (req, res) => {
    const index = userDatabase[userDatabase.length - 1].id + 1

    const newUser = {
        id: index,
        name: `${req.body.name}`,
        url: `${req.body.url}`
    }

    userDatabase.push(newUser)

    res.redirect("/")
})

// Add user from form with data and manually set id, then redirect to homepage
app.post("/users/id", (req, res) => {

    //Should return error if index already exists in DB, but for now we dont care
    const newUser = {
        id: Number(`${req.body.id}`),
        name: `${req.body.name}`,
        url: `${req.body.url}`
    }

    userDatabase.push(newUser)

    res.redirect("/")
})





// ---Cars routing---
app.get("/cars", (req, res) => {
    res.send({carsDatabase})
})

app.get("/cars/:id", (req, res) => {

    for (let k = 0; k < carsDatabase.length; k++) {

        if (carsDatabase[k].id == req.params.id) {

            res.send({ Found: carsDatabase[k] })
        }
    }
    

})




app.listen(8080)



