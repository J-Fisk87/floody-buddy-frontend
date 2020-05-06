
// Global Constants
let url = "http://localhost:3000/"
let usersUrl = `${url}/users`
let gaugesUrl = `${url}/gauges`
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
        users.forEach(user=> { 
            if (user.name === e.target[0].value && user.password === e.target[1].value){
                collapseHead()
            }   
        })
       alert("enserio guey... check name and password")
    });

    let signUp = document.getElementById("sign_up_form")
    signUp.addEventListener('submit', (e) => {
        e.preventDefault();
        users.forEach(user => {
            if (user.name === e.target[0].value) {
                alert("not good enough.")
            } else {
                let id = nextId()
                newUser = {
                    id: id,
                    name: e.target[0].value,
                    password: e.target[1].value
                }
            }
        });
        users.push(newUser)
        persistUser(newUser)
        currentUser = newUser
    })
};


//!!add if statement to confirm current user. add info for user
function userInfo(username) {
    locations.forEach(lctn => {
        console.log(lctn)
        let locationsUl = document.getElementById('locations')
        let newLi = document.createElement('li')

    })

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