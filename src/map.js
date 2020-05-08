console.log(".js party")

const map = document.getElementById("map");
// let g;
let e;


function doThing(event){
    e = event.target.alt
    console.log(event)
    let g = gauges.find(gauge => 
        gauge.location == event.target.alt)
    userGaugesPost(g);
    currentUser.gauges.push(g)
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
    }).then(r => r.json())
        .then(data => console.log(data))

}