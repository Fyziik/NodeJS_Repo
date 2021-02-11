// create a function called my first function that returns a greeting of sorts

function myFirstFunction() {
    return "Hello there!"
}

console.log(myFirstFunction())

// variable function
const myVariableFunction = function () {
    console.log("Hello there from the anonymous function")
}

myVariableFunction()

// arrow functions declar the "this" keyword differently, binds it to the scope of the function
const myArrowFunction = () => {
    return console.log("Hello there from the anonymous function that's also an arrow function")
}

myArrowFunction()

// callbacks
function sayHiLater(anyFunctionReference) {
    // simulate some code running
    // takes some time..
    // and more time..
    anyFunctionReference();
}

// call sayHiLater so that it says "Hi"
sayHiLater(() => console.log("Hi"))

// call sayHiLater so that it says "Hello"
sayHiLater(() => console.log("Hello"))


// poke someone
function interact(genericInteraction, name) {
    console.log(genericInteraction(name))
}

const poke = (name) => {
    return "Poke " + name
}

interact(poke, "Andreas")


// hug someone in one line
interact((name) => "Hug " + name, "Napster")


// hoisting --- Javascript "loads" the entire file before executing, which means you can call functions early in the file, even though they're not defined at that point
// so it sorta "understands the future", I suppose. Only works on specific keywords, such as function. Wont work on const or let etc.



