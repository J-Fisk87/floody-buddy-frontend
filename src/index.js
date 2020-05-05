// Global Constants
let url = "http://localhost:3000"
let usersUrl = `${url}/users`
let gaugesUrl = `${url}/gauges`

// DomContendLoaded
document.addEventListener("DOMContentLoaded", () => {
    fetchGauges()
    fetchUsers()

});

// Fetch
function fetchUsers(){
    fetch(usersUrl).then(r => r.json()).then(c => console.log(c))
};

function fetchGauges(){
    fetch(gaugesUrl).then(r => r.json()).then(g => console.log(g))
};

//Helper Methods