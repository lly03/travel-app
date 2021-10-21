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

    if(days < 0){
        alert("Please input valid dates!")
    }else{
        fetch('/add', {
            method:"POST", 
            credentials: "same-origin",
            mode: "cors",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({location: location, days: days})
        }).then(res => res.json())
        .then(addTrip(location, departureDate, days))
        .then(myModal.style.display = 'none')
        .catch(e =>console.log("error", e))
    }
    
}

async function addTrip(location, departureDate, days) {
    const req = await fetch('/all');
    try {
        const tripData = await req.json();
        
        if(tripData.lat ===  null || tripData.lng === null){
            alert("We cannot find the Location. Please try again.")
        } else {
            Client.createCard(location, departureDate, days, tripData);
        }
        
    } catch (e) {
        console.log("error", e);
    }
}

export {tripForm};



