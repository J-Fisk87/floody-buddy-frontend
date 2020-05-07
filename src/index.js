
// Global Constants
let url = "http://localhost:3000"
let usersUrl = `${url}/users`
let gaugesUrl = `${url}/gauges`
let locationDiv = document.getElementById("panic")
let users;
let tryAgain;
let currentUser;
let gauges;



// DomContendLoaded
document.addEventListener("DOMContentLoaded", () => {
    fetchGauges()
    fetchUsers()

});

// Fetch
function fetchUsers() {
    fetch(usersUrl).then(r => r.json()).then(c => userLogin(c))
};

function fetchGauges() {
    fetch(gaugesUrl).then(r => r.json()).then(g => gauges = g)
};

function persistUser(user) {
    let id = user.id
    fetch( usersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
        body: JSON.stringify({name: user.name, password: user.password})
    }).then(r => r.json())
    .then(data => {
        console.log(data)
    })
}; 


//Helper Methods

//sign in and sign up
function userLogin(c) {
    users = c

    let signIn = document.getElementById("sign_in_form")
    signIn.addEventListener('submit', (e) => {
        e.preventDefault();
        
        users.find(user => user.name === e.target[0].value) ?
        succesfulSignIn(e) : alert("enserio guey... check name and password") 
        })
    

    let signUp = document.getElementById("sign_up_form")
    signUp.addEventListener('submit', (e) => {
        e.preventDefault();
        users.find(user => user.name === e.target[0].value) ? alert("this user already exists") : persist(e)    
    })
};

//save user data upon succesful login
function succesfulSignIn(e) {
    currentUser = users.find(user => user.name === e.target[0].value)
    collapseHead()
    alert("you are logged in!")
    displayUserLocations()
};

//stage persist of user
function persist(e){
    let id = nextId()
    let newUser = {
        id: id,
        name: e.target[0].value,
        password: e.target[1].value
    }  
        users.push(newUser)
        currentUser = newUser
        persistUser(newUser)
        displayUserLocations()
};

//calculate next available user id
function nextId() {
    let nextId = users.reduce((acc, curr) => (
        curr.id >= acc ? curr.id + 1 : acc), 1);
    return nextId
}

//collapse header
function collapseHead(){
    console.log("please collapse mr log")
}   

//display user locations
function displayUserLocations() {
    
    currentUser.gauges.forEach( user => {
    console.log(user)
    let newDiv = document.createElement('div')
    locationDiv.appendChild(newDiv)
    newDiv.className = "loca"
    newDiv.id = currentUser.id
    newDiv.innerHTML = `
<div class="c1">
<b>water level (ft): ${user.water_level} </b>
</div>

<div class="c2">
<b>water flow (ft/3): ${user.water_flow} </b>
</div>

<div class="c3">
<b>flood point (ft): ${user.flood_stage} </b>
</div>

<div class="c4">
    <img id="water_icon" src="./assets/1870841-200.png" alt="water level" width="90" height="90">
</div>

<div class="c5">
    <img id="exit_${currentUser.id}" src="./assets/x.png" alt="exit" width="40" height="40">
</div>

<div class="c6">
    <b>lskajf  jskdfl j asklf jskladjf kj djfkls </b>
</div>
`
    

    });
};

//special thanks
//the noun project, open source icons
//lindsey, map
