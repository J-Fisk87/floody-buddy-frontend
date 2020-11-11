
const map = document.getElementById("map");

function doThing(event){
    let e = event.target.alt
    let g = gauges.find(gauge => 
        gauge.location == e)
    
    userGaugesPost(g);
    currentUser.gauges.push(g)
    locationDiv.innerHTML = "";
    displayUserLocations();
};

function userGaugesPost(g) {
    fetch(userGaugesUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            gauge_id: g.id,
            user_id: currentUser.id
        })
    })
}

