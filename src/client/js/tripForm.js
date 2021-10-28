import {v4 as uuidv4} from 'uuid';

const tripForm = (e) => {
    e.preventDefault();

    const form = e.target.parentNode.parentNode;
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
        })
        .then(res => {
            if (res.ok) {
                addTrip(location, returnDate, departureDate, days, uuid);
            } else {
                alert("We are having problems with finding the location. Please try to submit again.");
            }
        })
        .catch(e =>console.log("error", e))
    }
    
}

const addTrip = async (location, returnDate, departureDate, days, uuid) => {
    const res = await fetch('/all');
    try {
        const data = await res.json();
        const myModal = document.getElementById('myModal');
        myModal.style.display = 'none';
        Client.createCard(location, returnDate, departureDate, days, data, uuid);        
    } catch (e) {
        console.log("error", e);
    }
}

export { tripForm };



