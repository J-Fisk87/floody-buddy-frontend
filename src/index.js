// Global Constants
let url = "http://localhost:3000"
let usersUrl = `${url}/users`
let gaugesUrl = `${url}/gauges`
let userGaugesUrl = `${url}/user_gauges`
let locationDiv = document.getElementById("panic")
let users;
let userGauges;
let tryAgain;
let currentUser;
let gauges;
let userGaugeId;
let x;
let filtered;





// DomContendLoaded
document.addEventListener("DOMContentLoaded", () => {
    fetchUserGauges()
    fetchGauges()
    fetchUsers()
    closeCard()
});

// Fetch
function fetchUsers() {
    fetch(usersUrl).then(r => r.json()).then(c => userLogin(c))
};

function fetchUser() {
    let cur = currentUser.id
    fetch(`${usersUrl}/${cur}`).then(r => r.json()).then(c => currentUser = c);
    locationDiv.innerHTML = "";
    displayUserLocations()
}

function fetchGauges() {
    fetch(gaugesUrl).then(r => r.json()).then(g => gauges = g)
};

function fetchUserGauges() {
    fetch(userGaugesUrl).then(r => r.json()).then(ug => userGauges = ug)
};

function persistUser(user) {
    fetch(usersUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: user.name,
                password: user.password
            })
        }).then(r => r.json())
};

function removeLocation(e) {
        fetch( `${userGaugesUrl}/${x}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
            body: JSON.stringify()
        })
            .then(r => r.json())
            .then(fetchUsers())
};


//Helper Methods

//sign in and sign up
function userLogin(c) {
    users = c
    let signIn = document.getElementById("sign_in_form")
    signIn.addEventListener('submit', (e) => {
        e.preventDefault();

        users.find(user => user.name === e.target[0].value) ?
            succesfulSignIn(e) : alert("There was an error, please check username and password");
    })


    let signUp = document.getElementById("sign_up_form")
    signUp.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("User information successfully saved!")
        users.find(user => user.name === e.target[0].value) ? alert("This user already exists") : persist(e);
    })
};

//save user data upon succesful login
function succesfulSignIn(e) {
    currentUser = users.find(user => user.name === e.target[0].value)
    locationDiv.innerHTML = "";
    e.target[0].value = ""
    e.target[1].value = ""
    alert("You are logged in!")
    displayUserLocations()
};

//stage persist of user
function persist(e) {
    locationDiv.innerHTML = "";
    
    let id = nextId()
    let newUser = {
        id: id,
        name: e.target[0].value,
        password: e.target[1].value
    }
    users.push(newUser);
    currentUser = newUser;
    currentUser.gauges = [];
    persistUser(newUser);
    e.target[0].value = ""
    e.target[1].value = ""
};
//calculate next available user id
function nextId() {
    let nextId = users.reduce((acc, curr) => (
        curr.id >= acc ? curr.id + 1 : acc), 1);
    return nextId
};

//display user locations
function displayUserLocations() {
    currentUser.gauges.forEach(gauge => {
        let newDiv = document.createElement('div')
        locationDiv.appendChild(newDiv)
        newDiv.className = "loca";
        newDiv.innerHTML = `
    <div class="c1">
    <b style="color:black;">water level (ft) :</b><b> ${gauge.water_level} </b>
    </div>

    <div class="c2">
    <b style="color:black;">water flow (ft/3) :</b><b> ${gauge.water_flow} </b>
    </div>

    <div class="c3">
    <b style="color:black;">flood point (ft) :</b><b> ${gauge.flood_stage.toFixed(2)} </b>
    </div>

    <div class="c4">
        <img id="water_icon" src="./assets/1870841-200.png" alt="water level" width="90" height="90">
    </div>

    <div class="c5">
        <img class="xbutton" id="${gauge.id}" src="./assets/x.png" alt="exit" width="40" height="40">
    </div>

    <div class="c6">
        <b>check out the water level </b>
    </div>

    <div class="c7">
        <b> <h3>${gauge.location} </h3></b>
    </div>
    `
    });
};

//identify card to close
function closeCard() {
    locationDiv.addEventListener("click", (e) => {
        sliceIt(e)
        findUserGauge(e)
        currentUser.gauges.forEach(gauge => {
            e.target.id == gauge.id ? removeLocation() : null;
        });
        
    });
}

//find userGauge id
function findUserGauge(e) {
    let it = parseInt(e.target.id)
    
x = userGauges.find(gge => (gge.gauge_id === it && gge.user_id === currentUser.id)).id;

}

function sliceIt(e){    
    currentUser.gauges = currentUser.gauges.filter(
      (gge) => gge.id != e.target.id
    );
    locationDiv.innerHTML = "";
    displayUserLocations();
}




//special thanks
//Lindsay Fisk, hand-drawn map
//the noun project, open source icons
//https://digitalsynopsis.com/advertising/we-fix-your-adverts-honest-funny-ads/
