import {v4 as uuidv4} from 'uuid';

function tripForm(e){
    e.preventDefault();

    const form = e.target.parentNode.parentNode;
    const myModal = document.getElementById('myModal');
    const departureDate = form.departure.value;
    const returnDate = form.return.value;
    const start_date = new Date(departureDate);
    const end_date = new Date(returnDate);

    const difference = end_date.getTime() - start_date.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));

    const location = form.location.value;
    let uuid = uuidv4();

    if(days < 0){
        alert("Please input valid dates!")
    }else{
        fetch('/add', {
            method:"POST", 
            credentials: "same-origin",
            mode: "cors",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({location, days, uuid})
        }).then(res => res.json())
        .then(addTrip(location, returnDate, departureDate, days, uuid))
        .then(myModal.style.display = 'none')
        .catch(e =>console.log("error", e))
    }
    
}

async function addTrip(location, returnDate, departureDate, days, uuid) {
    const req = await fetch('/all');
    try {
        const data = await req.json();
        const tripData = await data[uuid];

        console.log(tripData.lat)
        
        // if(tripData.lat ===  null || tripData.lng === null){
        //     alert("We are having problems with finding the location. Please try to submit again.")
        // } else if (tripData.image === null){
        //     alert("Looks like we couldn't get all the data. Please try to submit again.")
        // } else {
        //     Client.createCard(location, returnDate, departureDate, days, tripData);
        // }
        
    } catch (e) {
        console.log("error", e);
    }
}

export {tripForm};



