const express = require('express')
const app = express()

// Tables for converting Date objects returned values (Number) into the names month / day. 
const dayConversionTable = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
}

// This table starts at 0, since .getMonth() starts from a 0 index, even though .getDay() starts at index 1. Guess they couldnt agree on indexing.
const monthConversionTable = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}



// Returns reformated date object as JSON
app.get("/date", (req, res) => {
    const date = new Date()
    res.send({
        timestamp: {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        },
        day: dayConversionTable[date.getDay()],
        month: monthConversionTable[date.getMonth()]
    })
})

// Returns reformated timestamp as JSON
app.get("/time", (req, res) => {
    const date = new Date()
    res.send({
        timestamp: {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        }
    })
})

// Return the current day of the week as JSON
app.get("/day", (req, res) => {
    const date = new Date()
    res.send({
        dayString: dayConversionTable[date.getDay()],
        dayNumber: date.getDay()
    })
})

// Return the current month as JSON
app.get("/month", (req, res) => {
    const date = new Date()
    res.send({
        monthString: monthConversionTable[date.getMonth()],
        monthNumber: date.getMonth() //Month starts at 0, so January === 0, which is why it returns 1 when we're in February
    })
})




app.listen(8080)