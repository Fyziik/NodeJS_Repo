// Link for spreadsheet with API Design: https://docs.google.com/spreadsheets/d/11ZrYRCzEAFhESOx37keIgWy4aY-tnfAgkb4FeF6Swg0/edit?usp=sharing

const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

//Mock-up databases
let userDatabase = [
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

let carsDatabase = [
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
app.post("/users/id", (req, res) => {

    let newUser = {}

    //Should return error if index already exists in DB, but for now we dont care
    //If an ID is included, do this
    if ( Number(`${req.body.id}` != 0 )) {
        
        //Make array of already taken IDs, and check if user ID already exists
        const takenIds = []
        userDatabase.forEach(element => {
            takenIds.push(element.id)
        });

        if (!takenIds.includes(Number(`${req.body.id}`))) {
            newUser = {
            id: Number(`${req.body.id}`),
            name: `${req.body.name}`,
            url: `${req.body.url}`
            }
        
        }
    }
    

    //If an ID is not included, do this
    else {
        let index = 0
        if (userDatabase.length != 0) {
            index = userDatabase[userDatabase.length - 1].id + 1
        }

        newUser = {
            id: index,
            name: `${req.body.name}`,
            url: `${req.body.url}`
        }
    }

    userDatabase.push(newUser)

    res.redirect("/")
})





// HTTP PUT/PATCH





// HTTP DELETE
// Use Postman for testing these out
// Delete all users from the database
app.delete("/users", (req, res) => {
    userDatabase = []

    res.redirect("/")
})

app.delete("/users/:id", (req, res) => {

    let indexOfUser = -1

    for (let k = 0; k < userDatabase.length; k++) {

        if (req.params.id == userDatabase[k].id) {
            indexOfUser = k
        }
    }

    if ( indexOfUser > -1 ) {
        userDatabase.splice(indexOfUser, 1)
    }
    
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



