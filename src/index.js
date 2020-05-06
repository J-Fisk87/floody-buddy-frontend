// Global Constants
let url = "http://localhost:3000"
let usersUrl = `${url}/users`
let gaugesUrl = `${url}/gauges`
let users;


// DomContendLoaded
document.addEventListener("DOMContentLoaded", () => {
    fetchGauges()
    fetchUsers()

});

// Fetch
function fetchUsers(){
    fetch(usersUrl).then(r => r.json()).then(c => userLogin(c))
};

function fetchGauges(){
    fetch(gaugesUrl).then(r => r.json()).then(g => console.log(g))
};

//Helper Methods

function userLogin(c) {
    console.log(c)
    users = c
    
    let signIn = document.getElementById("sign_in_form")
    signIn.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target[0].value)
        console.log(e.target[1].value)
    });
    
    let signUp = document.getElementById("sign_up_form")
    signUp.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        console.log(e.target[2].value)
    });
    

}

//!!add if statement to confirm current user. add info for user
function userInfo(username){    
    locations.forEach(lctn => {
        console.log(lctn)
        let locationsUl = document.getElementById('locations')
        let newLi = document.createElement('li')
        
    })

};
